/**
 * AI Service Abstraction Layer
 * 
 * Currently uses rule-based scoring internally.
 * Designed so a future Python FastAPI / ML service can be plugged in
 * by simply changing the implementation of `predict()` below.
 * 
 * Future integration:
 *   POST http://localhost:8000/ml/match  →  { score, breakdown, reasons }
 */

import { calculateScore, ScoreWeights, StudentProfile, InternshipProfile } from "../utils/scoreCalculator";
import { logger } from "../utils/logger";

export interface AIPredictRequest {
  student:    StudentProfile;
  internship: InternshipProfile;
  weights:    ScoreWeights;
}

export interface AIPredictResponse {
  score:    number;
  breakdown: {
    skills:        number;
    qualification: number;
    location:      number;
    interest:      number;
    experience:    number;
  };
  matchedSkills: string[];
  missingSkills: string[];
  isEligible:    boolean;
  reasons:       string[];
  source:        "rule-based" | "ml-model";
}

const ML_SERVICE_URL = process.env.ML_SERVICE_URL ?? "";

export async function predict(req: AIPredictRequest): Promise<AIPredictResponse> {
  // Try external ML service first (future integration)
  if (ML_SERVICE_URL) {
    try {
      const resp = await fetch(`${ML_SERVICE_URL}/ml/match`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(req),
        signal:  AbortSignal.timeout(5000),
      });
      if (resp.ok) {
        const data = await resp.json() as AIPredictResponse;
        data.source = "ml-model";
        return data;
      }
    } catch (err) {
      logger.warn("ML service unavailable — falling back to rule-based scoring", err);
    }
  }

  // Fallback: rule-based engine
  const result = calculateScore(req.student, req.internship, req.weights);
  return {
    score:    result.totalScore,
    breakdown: {
      skills:        result.skillScore,
      qualification: result.qualificationScore,
      location:      result.locationScore,
      interest:      result.interestScore,
      experience:    result.experienceScore,
    },
    matchedSkills: result.matchedSkills,
    missingSkills: result.missingSkills,
    isEligible:    result.isEligible,
    reasons:       result.reasons,
    source:        "rule-based",
  };
}

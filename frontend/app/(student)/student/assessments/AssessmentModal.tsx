"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon, CheckCircleIcon, AlertTriangleIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Assessment } from "@/types/assessment";

interface AssessmentModalProps {
  assessment: Assessment;
  onFinish: () => void;
}

type Phase = "instructions" | "quiz" | "result";

export default function AssessmentModal({ assessment, onFinish }: AssessmentModalProps) {
  const [phase, setPhase] = useState<Phase>("instructions");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(assessment.duration * 60);
  const [startedAt] = useState(Date.now());

  // Timer
  useEffect(() => {
    if (phase !== "quiz") return;
    if (timeLeft <= 0) { setPhase("result"); return; }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerColor = timeLeft < 120 ? "text-destructive" : "text-foreground";

  const question = assessment.questions[current];
  const attempted = Object.keys(answers).length;
  const unattempted = assessment.totalQuestions - attempted;

  const calculateResult = useCallback(() => {
    let correct = 0;
    let totalMarks = 0;
    let earnedMarks = 0;
    assessment.questions.forEach((q) => {
      totalMarks += q.marks;
      if (answers[q.id] === q.correctOption) {
        correct++;
        earnedMarks += q.marks;
      }
    });
    const pct = Math.round((earnedMarks / totalMarks) * 100);
    return { correct, totalMarks, earnedMarks, percentage: pct, passed: pct >= assessment.passingScore };
  }, [answers, assessment]);

  if (phase === "instructions") {
    return (
      <div className="space-y-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircleIcon className="size-5 text-primary" />
              Assessment Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="text-lg font-semibold text-foreground">{assessment.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{assessment.companyName} · {assessment.internshipTitle}</p>
            </div>
            <p className="text-sm text-muted-foreground">{assessment.description}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Questions",    value: assessment.totalQuestions },
                { label: "Duration",     value: `${assessment.duration} mins` },
                { label: "Passing Score",value: `${assessment.passingScore}%` },
                { label: "Type",         value: "Mixed" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <AlertTriangleIcon className="size-4" />
                <p className="text-sm font-medium">Before you begin</p>
              </div>
              {[
                "Timer starts as soon as you click Start Assessment.",
                "You can navigate between questions freely.",
                "Each question shows its marks.",
                "Unanswered questions count as wrong.",
                "Do not refresh or leave the page during the quiz.",
              ].map((t) => (
                <p key={t} className="text-xs text-amber-600 dark:text-amber-500 pl-6">• {t}</p>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onFinish} className="flex-1">Cancel</Button>
              <Button onClick={() => setPhase("quiz")} className="flex-1">Start Assessment</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === "result") {
    const res = calculateResult();
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircleIcon className={`size-5 ${res.passed ? "text-green-500" : "text-destructive"}`} />
              Assessment Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="text-center">
              <p className="text-5xl font-bold text-foreground">{res.percentage}%</p>
              <Badge variant={res.passed ? "default" : "destructive"} className="mt-2 text-sm">
                {res.passed ? "Passed ✓" : "Failed ✗"}
              </Badge>
            </div>
            <Progress value={res.percentage} className="h-3" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Score",       value: `${res.earnedMarks}/${res.totalMarks}` },
                { label: "Correct",     value: res.correct },
                { label: "Attempted",   value: attempted },
                { label: "Time Taken",  value: `${Math.round((Date.now() - startedAt) / 60000)}m` },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            {/* Per-question review */}
            <div className="space-y-2">
              <p className="text-sm font-semibold">Answer Review</p>
              {assessment.questions.map((q, i) => {
                const selected = answers[q.id];
                const correct = selected === q.correctOption;
                return (
                  <div key={q.id} className={`rounded-lg border p-3 text-sm ${correct ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"}`}>
                    <p className="font-medium text-foreground">Q{i + 1}. {q.questionText}</p>
                    <div className="mt-1.5 space-y-0.5 text-xs">
                      {selected !== undefined ? (
                        <p className={correct ? "text-green-600" : "text-red-600"}>
                          Your answer: {q.options[selected]} {correct ? "✓" : "✗"}
                        </p>
                      ) : (
                        <p className="text-muted-foreground">Not attempted</p>
                      )}
                      {!correct && (
                        <p className="text-green-600 dark:text-green-400">
                          Correct: {q.options[q.correctOption]}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <Button onClick={onFinish} className="w-full">Back to Assessments</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz phase
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{assessment.title}</p>
          <p className="text-xs text-muted-foreground">Q{current + 1} of {assessment.totalQuestions}</p>
        </div>
        <div className={`flex items-center gap-1.5 shrink-0 font-mono text-lg font-bold ${timerColor}`}>
          <ClockIcon className="size-4" />
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <Progress value={(attempted / assessment.totalQuestions) * 100} className="flex-1 h-1.5" />
        <span className="text-xs text-muted-foreground shrink-0">{attempted}/{assessment.totalQuestions} answered</span>
      </div>

      {/* Question */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-medium leading-relaxed text-foreground">
              {current + 1}. {question.questionText}
            </CardTitle>
            <div className="flex shrink-0 gap-1.5">
              <Badge variant="outline" className="text-xs">{question.difficulty}</Badge>
              <Badge variant="secondary" className="text-xs">{question.marks} pts</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {question.options.map((opt, idx) => {
              const selected = answers[question.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: idx }))}
                  className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                    selected
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-muted/50"
                  }`}
                >
                  <span className="mr-3 font-medium">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
          disabled={current === 0}
        >
          <ChevronLeftIcon className="mr-1 size-4" />Prev
        </Button>

        {/* Question nav dots */}
        <div className="flex flex-wrap justify-center gap-1">
          {assessment.questions.map((q, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`size-7 rounded text-xs font-medium transition-colors ${
                i === current
                  ? "bg-primary text-primary-foreground"
                  : answers[q.id] !== undefined
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {current < assessment.totalQuestions - 1 ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrent((p) => Math.min(assessment.totalQuestions - 1, p + 1))}
          >
            Next<ChevronRightIcon className="ml-1 size-4" />
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => setPhase("result")}
          >
            Submit
          </Button>
        )}
      </div>

      {/* Summary bar */}
      <div className="flex gap-4 rounded-lg bg-muted/50 p-3 text-xs">
        <span className="text-muted-foreground">Answered: <strong className="text-green-600">{attempted}</strong></span>
        <span className="text-muted-foreground">Unanswered: <strong className="text-amber-600">{unattempted}</strong></span>
        <span className="text-muted-foreground ml-auto">
          <button
            onClick={() => setPhase("result")}
            className="text-destructive underline underline-offset-2"
          >
            End &amp; Submit
          </button>
        </span>
      </div>
    </div>
  );
}

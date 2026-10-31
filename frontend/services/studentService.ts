import { mockStudents } from "@/data/students";
import type { Student } from "@/types/student";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getStudentById(id: string): Promise<Student | null> {
  await delay(300);
  return mockStudents.find((s) => s.id === id) ?? null;
}

export async function getAllStudents(): Promise<Student[]> {
  await delay(400);
  return mockStudents;
}

export async function updateStudentProfile(
  id: string,
  updates: Partial<Student>
): Promise<Student> {
  await delay(600);
  const student = mockStudents.find((s) => s.id === id);
  if (!student) throw new Error("Student not found.");
  return { ...student, ...updates, updatedAt: new Date().toISOString() };
}

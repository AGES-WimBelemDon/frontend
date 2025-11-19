import type { Id } from "./id";

export type Question = {
  id: Id;
  isRequired: boolean,
  questionId: Id,
  statement: string;
};

export type AnamneseResponse = {
  questionId?: number;
  answerId?: number
  content?: string;
  submissionDate?: string;
};

export type AnamneseSubmission = {
  submissionDate: string;
  answers: AnamneseResponse[];
};

export type AnamneseUpdate = {
  updates: AnamneseResponse[];
};

export type AnamneseFormAnswer = {
  answerId: Id;
  content: string,
  submissionDate: string;
  questionId: Id;
};

export type AnamneseFormType = {
  id: number,
  title: string,
  type: string
}
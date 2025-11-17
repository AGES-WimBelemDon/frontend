import type { Id } from "./id";

export type Question = {
  id: Id;
  statement: string;
};

export type AnamneseResponse = {
  questionId: Id;
  response: string;
};

export type AnamneseSubmission = {
  formId: Id;
  responses: AnamneseResponse[];
};

export type AnamneseFormInfo = {
  id: Id;
  date: string;
};

export type AnamneseFormType = {
  id: number,
  title: string,
  type: string
}
export type Question = {
  id: string;
  statement: string;
};

export type AnamneseResponse = {
  questionId: string;
  response: string;
};

export type AnamneseSubmission = {
  formId: string;
  responses: AnamneseResponse[];
};

export type AnamneseFormInfo = {
  id: string;
  date: string;
};

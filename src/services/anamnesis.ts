import dayjs from "dayjs";

import { api, endpoints } from "./api";
import type { AnamneseFormInfo, AnamneseSubmission, Question } from "../types/anamnesis";


export async function getAnamneseFormsByStudent(studentId: string): Promise<AnamneseFormInfo[]> {
  try {
    // TODO: This endpoint is a placeholder, replace with the actual endpoint
    const response = await api.get<AnamneseFormInfo[]>(`/students/${studentId}/anamnese-forms`);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    console.warn(`Mocking anamnese forms for studentId: ${studentId}`);
    const mockForms: AnamneseFormInfo[] = [
      { id: "1", date: "2023-03-12" },
      { id: "2", date: "2023-09-25" },
      { id: "3", date: "2024-02-18" },
      { id: "4", date: "2024-08-01" },
      { id: "new", date: dayjs().format("YYYY-MM-DD") },
    ];
    return Promise.resolve(mockForms);
  }
}

const mockQuestionSets: { [key: string]: Question[] } = {
  "1": [
    { id: "1-1", statement: "Historico de doencas familiares?" },
    { id: "1-2", statement: "A crianca ja teve alguma doenca grave?" },
  ],
  "2": [
    { id: "2-1", statement: "Como e a alimentacao da crianca?" },
    { id: "2-2", statement: "A crianca pratica atividades fisicas regularmente?" },
  ],
  "3": [
    { id: "3-1", statement: "Como e o desenvolvimento social da crianca?" },
    { id: "3-2", statement: "Existem preocupacoes sobre o comportamento da crianca?" },
  ],
  "4": [
    { id: "4-1", statement: "Qual o nivel de escolaridade dos pais?" },
    { id: "4-2", statement: "A crianca tem acesso a livros e materiais educativos em casa?" },
  ],
  "new": [
    { id: "new-1", statement: "Qual é o nome completo da criança?" },
    { id: "new-2", statement: "Qual a data de nascimento da criança?" },
    { id: "new-3", statement: "A criança possui alguma alergia? Se sim, qual?" },
    { id: "new-4", statement: "A criança utiliza algum medicamento contínuo? Se sim, qual?" },
    { id: "new-5", statement: "Existem outras informações de saúde relevantes?" },
  ],
};

export async function getQuestions(formId: string): Promise<Question[]> {
  try {
    // TODO: This endpoint is a placeholder, replace with the actual endpoint
    const response = await api.get<Question[]>(`${endpoints.assessment.base}/${formId}/questions`);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    console.warn(`Mocking questions for formId: ${formId}`);
    return Promise.resolve(mockQuestionSets[formId] || mockQuestionSets["new"]);
  }
}

export async function postAnamnese(submission: AnamneseSubmission): Promise<{ id: string }> {
  try {
    const response = await api.post(endpoints.assessment.base, submission);
    return response.data;
  } catch (error) {
    console.error("Error posting anamnese:", error);
    // Mock a successful response for development
    const newId = (Math.random() * 1000).toFixed(0).toString();
    return Promise.resolve({ id: newId });
  }
}

export async function getFormTypes(): Promise<{ id: number, title: string, type: string }[]> {
  try {
    const response = await api.get(endpoints.assessment.forms);
    return response.data
  } catch (error) {
    console.error("Error getting forms:", error);

    return Promise.resolve([
      { id: 1, title: "Psico", type: "PSICOLOGIA" },
      { id: 2, title: "Serviço Social", type: "SERVIÇO SOCIAL" },
    ])
  }
}
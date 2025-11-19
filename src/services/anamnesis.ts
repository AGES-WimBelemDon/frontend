import { api, endpoints } from "./api";
import type { AnamneseFormAnswer, AnamneseSubmission, Question } from "../types/anamnesis";
import type { Id } from "../types/id";


export async function getAnamneseFormsByStudent(studentId: Id, formType: string): Promise<AnamneseFormAnswer[]> {
  try {
    const response = await api.get<AnamneseFormAnswer[]>(endpoints.assessment.studentAssesments(studentId, formType));
    return response.data;
  } catch {
    console.warn(`Mocking anamnese forms for studentId: ${studentId}`);
    const mockForms: AnamneseFormAnswer[] = [
      { id: "1", questionId: "1-1", content: "Some content for question 1-1", submissionDate: "2023-03-12" },
      { id: "2", questionId: "1-2", content: "Some content for question 1-2", submissionDate: "2023-03-12" },
      { id: "3", questionId: "2-1", content: "Some content for question 2-1", submissionDate: "2023-09-25" },
      { id: "4", questionId: "2-2", content: "Some content for question 2-2", submissionDate: "2023-09-25" },
    ];
    return Promise.resolve(mockForms);
  }
}

const mockQuestionSets: { [key: string]: Question[] } = {
  "1": [
    { id: "1-1", questionId: "1-1", statement: "Historico de doencas familiares?", isRequired: true },
    { id: "1-2", questionId: "1-2", statement: "A crianca ja teve alguma doenca grave?", isRequired: false },
  ],
  "2": [
    { id: "2-1", questionId: "2-1", statement: "Como e a alimentacao da crianca?", isRequired: true },
    { id: "2-2", questionId: "2-2", statement: "A crianca pratica atividades fisicas regularmente?", isRequired: true },
  ],
  "3": [
    { id: "3-1", questionId: "3-1", statement: "Como e o desenvolvimento social da crianca?", isRequired: true },
    { id: "3-2", questionId: "3-2", statement: "Existem preocupacoes sobre o comportamento da crianca?", isRequired: false },
  ],
  "4": [
    { id: "4-1", questionId: "4-1", statement: "Qual o nivel de escolaridade dos pais?", isRequired: false },
    { id: "4-2", questionId: "4-2", statement: "A crianca tem acesso a livros e materiais educativos em casa?", isRequired: false },
  ],
  "new": [
    { id: "new-1", questionId: "new-1", statement: "Qual é o nome completo da criança?", isRequired: true },
    { id: "new-2", questionId: "new-2", statement: "Qual a data de nascimento da criança?", isRequired: true },
    { id: "new-3", questionId: "new-3", statement: "A criança possui alguma alergia? Se sim, qual?", isRequired: false },
    { id: "new-4", questionId: "new-4", statement: "A criança utiliza algum medicamento contínuo? Se sim, qual?", isRequired: false },
    { id: "new-5", questionId: "new-5", statement: "Existem outras informações de saúde relevantes?", isRequired: false },
  ],
};

export async function getQuestions(formId: string): Promise<Question[]> {
  try {
    // TODO: This endpoint is a placeholder, replace with the actual endpoint
    const response = await api.get<Question[]>(endpoints.assessment.questionsByFormType(formId));
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    console.warn(`Mocking questions for formId: ${formId}`);
    return Promise.resolve(mockQuestionSets["new"]);
  }
}

export async function postAnamnese(submission: AnamneseSubmission, studentId: Id): Promise<AnamneseFormAnswer[]> {
  try {
    const response = await api.post(endpoints.assessment.createAnswersByStudent(studentId), submission);
    return response.data;
  } catch (error) {
    console.error("Error posting anamnese:", error);
    // Mock a successful response for development
    const newId = (Math.random() * 1000).toFixed(0).toString();
    return Promise.resolve([{ id: newId, questionId: 0, content: "mock", submissionDate: "mock" }]);
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
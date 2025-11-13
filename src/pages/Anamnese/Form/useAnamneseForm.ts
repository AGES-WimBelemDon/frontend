import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";

import {
  getAnamneseFormsByStudent,
  getFormTypes,
  getQuestions,
  postAnamnese,
} from "../../../services/anamnesis";
import type { AnamneseFormInfo, AnamneseFormType, AnamneseSubmission, Question } from "../../../types/anamnesis";

export function useAnamneseForm() {
  const { studentId, formId } = useParams<{ studentId: string; formId: string }>();
  const navigate = useNavigate();

  const [forms, setForms] = useState<AnamneseFormInfo[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(formId === "new");
  const [formTypes, setFormTypes] = useState<AnamneseFormType[]>([])

  useEffect(function fetchStudentForms() {
    if (studentId) {
      getAnamneseFormsByStudent(studentId).then(setForms);
    }
  }, [studentId]);
  
  useEffect(function fetchQuestions() {
    if (formId && formId !== "new" && !isCreating) {
      getQuestions(formId).then(setQuestions);
    } else {
      // When creating a new form, we can fetch template questions
      getQuestions("new").then(setQuestions);
      setResponses({});
    }
  }, [formId, isCreating]);

  useEffect(function fetchFormTypes() {
    getFormTypes().then(setFormTypes)
  }, [])

  function handleResponseChange(questionId: string, value: string) {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!formId && !isCreating) {
      return;
    }

    const submission = {
      formId: isCreating ? undefined : formId,
      studentId,
      responses: Object.entries(responses).map(([questionId, response]) => ({
        questionId,
        response,
      })),
    };

    const result = await postAnamnese(submission as AnamneseSubmission);
    if (isCreating && result) {
      setIsCreating(false);
      // Navigate to the newly created form
      navigate(`/alunos/${studentId}/anamnese/${result.id}`, { replace: true });
    }
    // TODO: Add toast notification on success/error
  }

  function handleCreateNew() {
    setIsCreating(true);
  }

  function handleFormChange(newFormId: string) {
    if (newFormId) {
      setIsCreating(false);
      navigate(`/alunos/${studentId}/anamnese/${newFormId}`);
    }
  }

  return {
    forms,
    questions,
    formId: isCreating ? "new" : formId,
    responses,
    isCreating,
    formTypes,
    handleResponseChange,
    handleSubmit,
    handleCreateNew,
    handleFormChange,
  };
};

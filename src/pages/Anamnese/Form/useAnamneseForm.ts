import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";

import {
  getAnamneseFormsByStudent,
  getFormTypes,
  getQuestions,
  postAnamnese,
} from "../../../services/anamnesis";
import type { AnamneseFormInfo, AnamneseFormType, AnamneseSubmission, Question } from "../../../types/anamnesis";
import type { Id } from "../../../types/id";

export function useAnamneseForm() {
  const { studentId, formId } = useParams<{ studentId: string; formId: string }>();
  const navigate = useNavigate();
  const [forms, setForms] = useState<AnamneseFormInfo[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(formId === "new");
  const [formTypes, setFormTypes] = useState<AnamneseFormType[]>([])
  const [selectedFormType, setSelectedFormType] = useState<AnamneseFormType>()
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(function fetchQuestions() {
    const formTypeById = formTypes.filter(formType => formType.id.toString() == formId)
    setSelectedFormType(formTypeById[0])

    if (selectedFormType) {
      getQuestions(selectedFormType.type.toString()).then(setQuestions)
    }
  }, [selectedFormType, formTypes, formId])

  useEffect(function fetchStudentForms() {
    if (studentId) {
      getAnamneseFormsByStudent(studentId).then(setForms);
    }
  }, [studentId]);

  useEffect(function fetchFormTypes() {
    getFormTypes().then(setFormTypes)
  }, [])

  function handleResponseChange(questionId: Id, value: string) {
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

  function handleSelectFormType(formId: number) {
    const formTypeById = formTypes.filter(formType => formType.id == formId)
    setSelectedFormType(formTypeById[0])
  }

  return {
    forms,
    selectedFormType,
    formId: isCreating ? "new" : formId,
    responses,
    questions,
    isCreating,
    formTypes,
    handleSelectFormType,
    handleResponseChange,
    handleSubmit,
    handleCreateNew,
    handleFormChange,
  };
};

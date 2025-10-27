import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";

import {
  getAnamneseFormsByStudent,
  getQuestions,
  postAnamnese,
  type AnamneseSubmission,
  type AnamneseFormInfo,
  type Question,
} from "../../../services/anamnesis";

export const useAnamneseForm = () => {
  const { studentId, formId } = useParams<{ studentId: string; formId: string }>();
  const navigate = useNavigate();

  const [forms, setForms] = useState<AnamneseFormInfo[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [isCreating, setIsCreating] = useState(formId === "new");

  useEffect(() => {
    if (studentId) {
      getAnamneseFormsByStudent(studentId).then(setForms);
    }
  }, [studentId]);

  useEffect(() => {
    if (formId && formId !== "new" && !isCreating) {
      getQuestions(formId).then(setQuestions);
    } else {
      // When creating a new form, we can fetch template questions
      getQuestions("new").then(setQuestions);
      setResponses({});
    }
  }, [formId, isCreating]);

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formId && !isCreating) return;

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
      navigate(`/students/${studentId}/anamnese/${result.id}`, { replace: true });
    }
    // TODO: Add toast notification on success/error
  };

  const handleCreateNew = () => {
    setIsCreating(true);
  };

  const handleFormChange = (newFormId: string) => {
    if (newFormId) {
      setIsCreating(false);
      navigate(`/students/${studentId}/anamnese/${newFormId}`);
    }
  };

  return {
    forms,
    questions,
    formId: isCreating ? "new" : formId,
    responses,
    isCreating,
    handleResponseChange,
    handleSubmit,
    handleCreateNew,
    handleFormChange,
  };
};
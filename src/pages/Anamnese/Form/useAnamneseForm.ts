import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";

import { useStudents } from "../../../hooks/useStudents";
import {
  getAnamneseFormsByStudent,
  getFormTypes,
  getQuestions,
  postAnamnese,
} from "../../../services/anamnesis";
import type { AnamneseFormType, AnamneseSubmission, Question } from "../../../types/anamnesis";
import type { Id } from "../../../types/id";
import dayjs from "dayjs";

export function useAnamneseForm() {
  const { formType, formId } = useParams<{ formType: string, formId: string }>();
  const navigate = useNavigate();
  const [formDates, setFormDates] = useState<string[]>([]);
  const [responses, setResponses] = useState<Record<Id, string>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [formTypes, setFormTypes] = useState<AnamneseFormType[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const { currentStudentId } = useStudents();

  useEffect(function fetchQuestions() {
    if (formType) {
      getQuestions(formType).then(setQuestions);
    }
  }, [formType]);

  useEffect(function fetchStudentForms() {
    if (currentStudentId && formType) {
      getAnamneseFormsByStudent(currentStudentId, formType).then(r => {
        const uniqueDates = [...new Set(r.map(form => form.submissionDate))];
        setFormDates(uniqueDates);
      });
    }
  }, [currentStudentId, formType]);

  useEffect(function fetchFormTypes() {
    getFormTypes().then(setFormTypes);
  }, []);

  useEffect(function fetchResponses() {
    if (formId && formId !== "new" && currentStudentId && formType) {
      getAnamneseFormsByStudent(currentStudentId, formType).then(r => {
        const submissionAnswers = r.filter(answer => answer.submissionDate === formId);
        const answers = submissionAnswers.reduce((acc, answer) => {
          acc[answer.questionId] = answer.content;
          return acc;
        }, {} as Record<Id, string>);
        setResponses(answers);
      });
    } else {
      setResponses({});
    }
  }, [formId, currentStudentId, formType]);

  function handleResponseChange(questionId: Id, value: string) {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!currentStudentId || (!formId && !isCreating)) {
      return;
    }

    if (formId) {
      const submission: AnamneseSubmission = {
        submissionDate: formId !== "new" ? formId : dayjs().toString(),
        answers: Object.entries(responses).map(([questionId, response]) => ({
          questionId: Number(questionId),
          content: response,
        })),
      };

      const result = await postAnamnese(submission, currentStudentId);
      if (isCreating && result) {
        setIsCreating(false);
        navigate(`/alunos/${currentStudentId}/anamnese/${result[0].submissionDate}`, { replace: true });
      }
    }
    // TODO: Add toast notification on success/error
  }

  function handleCreateNew() {
    setIsCreating(true);
    navigate(`/alunos/${currentStudentId}/anamnese/form/${formType}/new`);
  }

  function handleFormChange(newFormId: string) {
    if (newFormId) {
      setIsCreating(false);
      navigate(`/alunos/${currentStudentId}/anamnese/form/${formType}/${newFormId}`);
    }
  }

  return {
    formId,
    responses,
    questions,
    isCreating,
    formTypes,
    formDates,
    handleResponseChange,
    handleSubmit,
    handleCreateNew,
    handleFormChange,
  };
}

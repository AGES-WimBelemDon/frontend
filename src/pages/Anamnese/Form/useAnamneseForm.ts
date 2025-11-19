import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router";

import { useStudents } from "../../../hooks/useStudents";
import {
  getAnamneseFormsByStudent,
  getFormTypes,
  getQuestions,
  patchAnamnese,
  postAnamnese,
} from "../../../services/anamnesis";
import type { AnamneseFormType, AnamneseSubmission, AnamneseUpdate, Question } from "../../../types/anamnesis";
import type { Id } from "../../../types/id";

type ResponsesState = Record<Id, { content: string; answerId: Id | null }>;

export function useAnamneseForm() {
  const { formType, formId } = useParams<{ formType: string, formId: string }>();
  const navigate = useNavigate();
  const [formDates, setFormDates] = useState<string[]>([]);
  const [responses, setResponses] = useState<ResponsesState>({});
  const [initialResponses, setInitialResponses] = useState<ResponsesState>({});
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
          acc[answer.questionId] = { content: answer.content, answerId: answer.answerId };
          return acc;
        }, {} as ResponsesState);
        setResponses(answers);
        setInitialResponses(answers);
      });
    } else {
      setResponses({});
      setInitialResponses({});
    }
  }, [formId, currentStudentId, formType]);

  function handleResponseChange(questionId: Id, value: string) {
    setResponses((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        content: value,
        answerId: prev[questionId]?.answerId ?? null,
      },
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!currentStudentId || !formType || (!formId && !isCreating)) {
      return;
    }

    const submissionDate = formId !== "new" ? formId : dayjs().toString();

    const answersToPost = [];
    const answersToPatch = [];

    for (const questionId in responses) {
      const response = responses[questionId];
      const initialResponse = initialResponses[questionId];

      if (initialResponse) { // Existing answer
        if (response.content !== initialResponse.content) {
          answersToPatch.push({ answerId: Number(response.answerId), content: response.content });
        }
      } else { // New answer
        answersToPost.push({ questionId: Number(questionId), content: response.content });
      }
    }

    const promises = [];

    if (submissionDate) {
      if (answersToPost.length > 0) {
        const submission: Omit<AnamneseSubmission, "formType"> = {
          submissionDate,
          answers: answersToPost,
        };
        promises.push(postAnamnese(submission, currentStudentId));
      }

      if (answersToPatch.length > 0) {
        const submission: AnamneseUpdate = {
          updates: answersToPatch,
        };
        promises.push(patchAnamnese(submission));

      }
    }

    if (promises.length > 0) {
      const results = await Promise.all(promises);
      if (isCreating && results.length > 0 && results[0]) {
        setIsCreating(false);
        const newSubmissionDate = results[0][0].submissionDate;
        navigate(`/alunos/${currentStudentId}/anamnese/form/${formType}/${newSubmissionDate}`, { replace: true });
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

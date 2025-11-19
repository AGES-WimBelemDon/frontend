import { useEffect, useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { strings } from "../../constants";
import { useActivities } from "../../hooks/useActivities";
import { useFilters } from "../../hooks/useFilters";
import { useStudents } from "../../hooks/useStudents";
import { useToast } from "../../hooks/useToast";
import { useUsers } from "../../hooks/useUsers";
import { createClasses, patchClass } from "../../services/classes";
import { createEnrollment } from "../../services/enrollments";
import type { Classes, CreateClassForm } from "../../types/classes";
import type { Id } from "../../types/id";


export function useClassesModal({ isOpen, closeModal, classData }: { isOpen: boolean, closeModal: () => void, classData?: Classes }) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { students, isLoadingStudents, studentsError } = useStudents();
  const { levelOptions, weekDaysOptions } = useFilters()
  const { users, isLoadingUsers, usersError } = useUsers();
  const { activities, isLoadingActivities, activitiesError } = useActivities();
  const [nameStudent, setNameStudent] = useState("");
  const [nameTeacher, setNameTeacher] = useState("");
  const [activityName, setActivityName] = useState("");

  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedStudents, setSelectedStudents] = useState<Id[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<Id[]>([]);

  const isEditing = classData !== undefined;

  const steps = isEditing
    ? [
      strings.classesModal.steps.data,
      strings.classesModal.steps.activity,
      strings.classesModal.steps.teacher,
    ]
    : [
      strings.classesModal.steps.data,
      strings.classesModal.steps.activity,
      strings.classesModal.steps.teacher,
      strings.classesModal.steps.student,
    ];

  const days = useMemo(() => weekDaysOptions?.map(({ id, label }, index) => ({
    id: index + 1,
    value: id,
    symbol: label.charAt(0).toUpperCase(),
  })), [weekDaysOptions]);

  const { control, getValues, reset } = useForm<CreateClassForm>({
    defaultValues: {
      name: "",
      activityId: 0,
      levelId: "",
      teacherIds: [],
      studentIds: [],
      isRecurrent: false,
      startDate: "",
      endDate: "",
      startTime: null,
      endTime: null,
      dayOfWeek: [],
      dayOfWeekSelection: [],
    },
  });

  useEffect(() => {
    if (classData) {
      function parseTimeToDate(value?: string | Date | null): Date | null {
        if (!value) return null;
        if (value instanceof Date) {
          if (isNaN(value.getTime())) return null;
          return value;
        }
        const asString = String(value);
        const timeOnly = asString.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
        if (timeOnly) {
          const hh = Number(timeOnly[1]);
          const mm = Number(timeOnly[2]);
          const ss = Number(timeOnly[3] ?? "0");
          const d = new Date();
          d.setHours(hh, mm, ss, 0);
          return d;
        }
        const parsed = new Date(asString);
        if (!isNaN(parsed.getTime())) return parsed;
        return null;
      }

      reset({
        name: classData.name,
        activityId: classData.activityId,
        levelId: classData.levelId,
        teacherIds: classData.teachers.map((teacher) => teacher.id),
        studentIds: [],
        isRecurrent: classData.isRecurrent,
        startDate: classData.startDate,
        endDate: classData.endDate,
        startTime: parseTimeToDate(classData.startTime),
        endTime: parseTimeToDate(classData.endTime),
        dayOfWeek: classData.schedules.map((schedule) => schedule.dayOfWeek),
        dayOfWeekSelection: classData.schedules.map((schedule) => ({ id: schedule.id, dayOfWeek: schedule.dayOfWeek })),
      });
    } else {
      reset();
    }
  }, [classData, reset]);

  const isLastStep = activeStep === steps.length - 1;

  function handleNext(): boolean {
    if (activeStep >= steps.length) {
      return false;
    }
    setActiveStep((prev) => prev + 1);
    return true;
  }

  function handleBack(): boolean {
    if (activeStep <= 0) {
      return false;
    }
    setActiveStep((prev) => prev - 1);
    return true;
  }

  async function handleSubmit() {
    const { studentIds, dayOfWeekSelection, ...classFormData } = getValues() as CreateClassForm;

    const dayOfWeekStrings = (dayOfWeekSelection ?? []).map((d) => {
      // @ts-expect-error -- value exists
      return d.value;
    });

    if (!classFormData) {
      showToast(strings.classesModal.createErrorFillAllFields, "error");
      return;
    }

    try {
      if (isEditing && classFormData) {
        const formattedClassData = {
          ...classFormData,
          startTime: formatTime(classFormData.startTime),
          endTime: formatTime(classFormData.endTime),
        };
        await patchClass(classData.id, formattedClassData);
        showToast(strings.classesModal.editSuccessMessage, "success");
      } else {
        const formattedClassData = {
          ...classFormData,
          startDate: formatDate(classFormData.startDate),
          startTime: formatTime(classFormData.startTime),
          endTime: formatTime(classFormData.endTime),
          dayOfWeek: dayOfWeekStrings,
        };
        if (classFormData.endDate) {
          formattedClassData.endDate = formatDate(classFormData.endDate);
        }
        const classId = await createClasses(formattedClassData);
        if (!classId) {
          throw new Error("Error in ClassesModalcreateClass");
        }
        await createEnrollment({ classId, studentIds: studentIds });
        showToast(strings.classesModal.createSuccessMessage, "success");
      }
      setActiveStep(0);
      reset();
      setNameStudent("");
      setNameTeacher("");
      closeModal();
    } catch {
      if (isEditing) {
        showToast(strings.classesModal.editErrorGeneric, "error");
        return;
      }
      showToast(strings.classesModal.createErrorGeneric, "error");
    } finally {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    }
  }

  function formatDate(date: string): string {
    if (!date) return "";

    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      const yyyy = String(parsed.getFullYear());
      const mm = String(parsed.getMonth() + 1).padStart(2, "0");
      const dd = String(parsed.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }
    return "";
  }

  function formatTime(date?: string | Date | null): string {
    if (!date) return "";

    if (date instanceof Date) {
      if (isNaN(date.getTime())) return "";
      const hh = String(date.getHours()).padStart(2, "0");
      const mm = String(date.getMinutes()).padStart(2, "0");
      const ss = String(date.getSeconds()).padStart(2, "0");
      return `${hh}:${mm}:${ss}`;
    }

    const timeOnly = (date as string).match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (timeOnly) {
      const hh = timeOnly[1].padStart(2, "0");
      const mm = timeOnly[2];
      const ss = (timeOnly[3] ?? "00").padStart(2, "0");
      return `${hh}:${mm}:${ss}`;
    }
    const parsed = new Date(date as string);
    if (!isNaN(parsed.getTime())) {
      const hh = String(parsed.getHours()).padStart(2, "0");
      const mm = String(parsed.getMinutes()).padStart(2, "0");
      const ss = String(parsed.getSeconds()).padStart(2, "0");
      return `${hh}:${mm}:${ss}`;
    }

    const fallback = (date as string).match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (fallback) {
      const hh = fallback[1].padStart(2, "0");
      const mm = fallback[2];
      const ss = (fallback[3] ?? "00").padStart(2, "0");
      return `${hh}:${mm}:${ss}`;
    }

    return "";
  }

  const filteredStudents = useMemo(() => {
    if (isLoadingStudents || studentsError || !students) {
      return [];
    }
    return students.filter((student) => {
      const nameMatch =
        nameStudent === "" ||
        student.fullName.toLowerCase().includes(nameStudent.toLowerCase());
      return nameMatch;
    });
  }, [isLoadingStudents, studentsError, students, nameStudent]);

  const filteredTeachers = useMemo(() => {
    if (isLoadingUsers || usersError || !users) {
      return [];
    }
    return users.filter((user) => {
      const nameMatch =
        nameTeacher === "" ||
        user.fullName.toLowerCase().includes(nameTeacher.toLowerCase());
      return nameMatch;
    });
  }, [isLoadingUsers, usersError, users, nameTeacher]);

  const filteredActivities = useMemo(() => {
    if (isLoadingActivities || activitiesError || !activities) {
      return [];
    }
    return activities.filter((activity) => {
      const nameMatch =
        activityName === "" ||
        activity.name.toLowerCase().includes(activityName.toLowerCase());
      return nameMatch;
    });
  }, [isLoadingActivities, activitiesError, activities, activityName]);

  return {
    isOpen,
    closeModal,
    activeStep,
    steps,
    control,
    levelOptions,
    days: days || [],
    nameTeacher,
    setNameTeacher,
    selectedTeachers,
    setSelectedTeachers,
    filteredTeachers,
    nameStudent,
    setNameStudent,
    selectedStudents,
    setSelectedStudents,
    filteredStudents,
    activityName,
    setActivityName,
    filteredActivities,
    handleBack,
    handleNext,
    isLastStep,
    handleSubmit,
    isEditing,
  };
}

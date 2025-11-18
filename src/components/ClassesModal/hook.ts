import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";

import { getUserLocale, strings } from "../../constants";
import { useActivities } from "../../hooks/useActivities";
import { useFilters } from "../../hooks/useFilters";
import { useStudents } from "../../hooks/useStudents";
import { useToast } from "../../hooks/useToast";
import { useUsers } from "../../hooks/useUsers";
import { createClasses, patchClass } from "../../services/classes";
import { createEnrollment } from "../../services/enrollments";
import type { Classes, CreateClassForm } from "../../types/classes";
import type { Id } from "../../types/id";

const steps = [strings.classesModal.steps.data, strings.classesModal.steps.activity, strings.classesModal.steps.teacher, strings.classesModal.steps.student];

export function useClassesModal({ isOpen, closeModal, classData }: { isOpen: boolean, closeModal: () => void, classData?: Classes }) {
  const { showToast } = useToast();
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

  const isEditing = classData ? true : false;

  const days = useMemo(() => weekDaysOptions?.map(({ id, label }) => ({
    id,
    value: label,
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
      startTime: "",
      endTime: "",
      dayOfWeek: [],
    },
  });

  useEffect(() => {
    if (classData) {
      reset({
        name: classData.name,
        activityId: classData.activityId,
        levelId: classData.levelId,
        teacherIds: classData.teachers.map((teacher) => teacher.id),
        studentIds: [],
        isRecurrent: classData.isRecurrent,
        startDate: classData.startDate,
        endDate: classData.endDate,
        startTime: classData.startTime,
        endTime: classData.endTime,
        dayOfWeek: classData.schedules.map((schedule) => schedule.dayOfWeek),
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
    const formData = getValues();

    if (!formData) {
      showToast(strings.classesModal.createErrorFillAllFields, "error");
      return;
    }

    try {
      if (isEditing && classData) {
        await patchClass(classData.id, formData);
        showToast(strings.classesModal.editSucessMessage, "success");
      } else {
        const classId = await createClass(formData);
        if (!classId) {
          throw new Error("Error in ClassesModalcreateClass");
        }
        await createEnrollment({ classId, studentIds: formData.studentIds });
        showToast(strings.classesModal.createSuccessMessage, "success");
      }
      setActiveStep(0);
      reset();
      setNameStudent("");
      setNameTeacher("");
      closeModal();
    } catch {
      showToast(isEditing ? strings.classesModal.editErrorGeneric : strings.classesModal.createErrorGeneric, "error");
    }
  }

  async function createClass(data: CreateClassForm): Promise<Id | null> {
    try {
      // const { studentIds, ...classData } = data;
      const formattedData = {
        ...data,
        startTime: new Date(data.startTime).toLocaleTimeString(getUserLocale(), { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        endTime: new Date(data.endTime).toLocaleTimeString(getUserLocale(), { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      };
      const classId = await createClasses(formattedData);
      return classId;
    } catch {
      return null;
    }
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

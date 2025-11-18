import { useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

import { strings } from "../../constants";
import { useActivities } from "../../hooks/useActivities";
import { useFilters } from "../../hooks/useFilters";
import { useStudents } from "../../hooks/useStudents";
import { useToast } from "../../hooks/useToast";
import { useUsers } from "../../hooks/useUsers";
import { createClasses } from "../../services/classes";
import type { CreateClassForm } from "../../types/classes";
import type { Id } from "../../types/id";


const steps = [strings.classesModal.steps.data, strings.classesModal.steps.activity, strings.classesModal.steps.teacher, strings.classesModal.steps.student];

export function useClassesModal() {
  const { showToast } = useToast();
  const { students, isLoadingStudents, studentsError } = useStudents();
  const { levelOptions, weekDaysOptions } = useFilters()
  const { users, isLoadingUsers, usersError } = useUsers();
  const { activities, isLoadingActivities, activitiesError } = useActivities();
  const [searchParams, setSearchParams] = useSearchParams();
  const [nameStudent, setNameStudent] = useState("");
  const [nameTeacher, setNameTeacher] = useState("");
  const [activityName, setActivityName] = useState("");

  const isOpen = searchParams.get("action") === "open-classes-modal";

  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedStudents, setSelectedStudents] = useState<Id[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<Id[]>([]);

  const days = weekDaysOptions?.map(({ id, label }) => ({
    id,
    value: label,
    symbol: label.charAt(0).toUpperCase(),
  }));

  const { control, getValues, reset } = useForm<CreateClassForm>({
    defaultValues: {
      name: "",
      activityId: 0,
      levelId: "",
      teacherIds: [],
      studentsId: [],
      isRecurrent: false,
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      dayOfWeek: [],
    },
  });

  function openClassesModal() {
    const params = new URLSearchParams(searchParams);
    params.set("action", "open-classes-modal");
    setSearchParams(params);
  }

  function closeModal() {
    const params = new URLSearchParams();
    setSearchParams(params);
  }

  const isLastStep = activeStep === steps.length - 1;

  function handleNext(): boolean {
    if (activeStep >= steps.length) {
      return false;
    }

    setActiveStep((prev) => prev + 1);
    return true;
  };

  function handleBack(): boolean {
    if (activeStep <= 0) {
      return false;
    }

    setActiveStep((prev) => prev - 1);
    return true;
  };

  function handleSubmit() {
    const formData = getValues();
    //TEM QUE DESENVOLVER
    // const {StudentsId, ClassData} = formData()
    if (!formData) {
      showToast(strings.classesModal.createErrorFillAllFields, "error");
      return;
    }
    try {
      const classId = createClass(formData);
      if (!classId) {
        throw new Error("Error in ClassesModalcreateClass");
      }
      // DESENVOLVER DEPOIS
      // createEnrollment({ classId, studentsId });
      setActiveStep(0);
      reset();
      setNameStudent("");
      setNameTeacher("");
    } catch {
      showToast(strings.classesModal.createErrorGeneric, "error");
    }
  }

  async function createClass(data: CreateClassForm): Promise<Id | null> {
    try {
      const classId = await createClasses(data);
      showToast(strings.classesModal.createSuccessMessage, "success");
      closeModal();
      return classId;
    } catch {
      showToast(strings.classesModal.createErrorGeneric, "error");
      return null;
    }
  }

  const filteredStudents = useMemo(() => {
    if (isLoadingStudents || studentsError || !students) {
      return []
    }
    return students.filter((student) => {
      const nameMatch =
        nameStudent === "" ||
        student.fullName.toLowerCase().includes(nameStudent.toLowerCase());
      return nameMatch;
    })
  }, [isLoadingStudents, studentsError, students, nameStudent])

  const filteredTeachers = useMemo(() => {
    if (isLoadingUsers || usersError || !users) {
      return []
    }
    return users.filter((user) => {
      const nameMatch =
        nameTeacher === "" ||
        user.fullName.toLowerCase().includes(nameTeacher.toLowerCase());
      return nameMatch;
    })

  }, [isLoadingUsers, usersError, users, nameTeacher])


  const filteredActivities = useMemo(() => {
    if (isLoadingActivities || activitiesError || !activities) {
      return []
    }
    return activities.filter((activity) => {
      const nameMatch =
        activityName === "" ||
        activity.name.toLowerCase().includes(activityName.toLowerCase());
      return nameMatch;
    })

  }, [isLoadingActivities, activitiesError, activities, activityName])

  return {
    isOpen,
    closeModal,
    openClassesModal,
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
  }
}

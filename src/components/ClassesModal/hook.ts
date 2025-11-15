import { useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

import type { Classes } from "./interface";
import { strings } from "../../constants";
import { useStudents } from "../../hooks/useStudents";
import { useToast } from "../../hooks/useToast";
import { useUsers } from "../../hooks/useUsers";
import { getLevelsFilter, getWeekDaysFilter } from "../../services/filters";
import type { Id } from "../../types/id";

const days = await getWeekDaysFilter().then(res => res.map((day, i) => ({
  id: `${i}` + `${day}`,
  value: day,
  symbol: day.charAt(0).toUpperCase(),
})));
const level = await getLevelsFilter();
const steps = ["Dados", "Professor", "Alunos"];

export function useClassesModal() {
  const { showToast } = useToast();
  const { students, isLoadingStudents, studentsError } = useStudents();
  const { users, isLoadingUsers, usersError } = useUsers();
  const [searchParams, setSearchParams] = useSearchParams();
  const [nameStudent, setNameStudent] = useState("");
  const [nameTeacher, setNameTeacher] = useState("");

  const isOpen = searchParams.get("action") === "open-classes-modal";

  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedStudents, setSelectedStudents] = useState<Id[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<Id[]>([]);

  const { control, getValues, reset } = useForm<Classes>({
    defaultValues: {
      name: "",
      activityId: 0,
      levelId: "",
      state: "true",
      teachersId: [],
      isRecurrent: false,
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      weekDay: [],
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

    if (!formData || selectedTeachers.length === 0 || selectedStudents.length === 0) {
      showToast(strings.classesModal.createErrorFillAllFields, "error");
      return;
    }

    try {
      createClass(formData);

      setActiveStep(0);
      reset();
      setSelectedStudents([]);
      setSelectedTeachers([]);
      setNameStudent("");
      setNameTeacher("");
    } catch {
      showToast(strings.classesModal.createErrorGeneric, "error");
    }
  }

  function createClass(data: Classes): void {
    // TODO: Send to back and remove console.log
    console.log({ ...data, selectedTeachers, selectedStudents });
    showToast(strings.classesModal.createSuccessMessage, "success");
    closeModal();
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

  return {
    isOpen,
    closeModal,
    openClassesModal,
    activeStep,
    steps,
    control,
    level,
    days,
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
    handleBack,
    handleNext,
    isLastStep,
    handleSubmit,
  }
}

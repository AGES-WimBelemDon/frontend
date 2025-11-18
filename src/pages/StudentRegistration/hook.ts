import { useState, useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { Document } from "./interface";
import { strings } from "../../constants";
import { useRoutes } from "../../hooks/useRoutes";
import { useToast } from "../../hooks/useToast";
import { fetchAddress } from "../../services/address";
import {
  addStudentDocument,
  registerAddress,
  registerStudent as apiRegisterStudent,
  updateStudent as apiUpdateStudent,
  updateStudentAddress as apiUpdateStudentAddress,
  activateStudent as apiActivateStudent,
  getStudentById,
  getStudentAddress,
  deactivateStudent as apiDeactivateStudent
} from "../../services/students";
import type { AddressResponse } from "../../types/address";
import type { Address } from "../../types/address";
import type { Id } from "../../types/id";
import type { Student } from "../../types/students";

export function useStudentRegistration() {
  const { showToast } = useToast()
  const { goBack, getPathParamId } = useRoutes();
  const queryClient = useQueryClient();

  const [address, setAddress] = useState<Partial<Address> | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showUploader, setShowUploader] = useState(false);
  const [docForm, setDocForm] = useState({
    fileName: "",
    fileType: "",
    origin: "",
    date: "",
    description: "",
  });

  const editingId = getPathParamId("alunos");
  const studentId = editingId ? Number(editingId) : null;
  const isEditing = Boolean(studentId);

  function getAddressDetails() {
    if (!address?.cep) {
      return Promise.resolve(null);
    }

    if (address.cep.length !== 8) {
      return Promise.resolve(null);
    }

    return fetchAddress(address.cep).then((addr) => {
      setAddress(addr);
      return addr;
    });
  }


  useQuery({
    queryKey: ["addressByCep", address?.cep],
    queryFn: getAddressDetails,
  })

  const studentQuery = useQuery({
    queryKey: ["studentById", studentId],
    queryFn: () => getStudentById(studentId!),
    enabled: isEditing,
  });

  const addressQuery = useQuery<AddressResponse | null>({
    queryKey: ["studentAddressById", studentId],
    queryFn: () => getStudentAddress(studentId!),
    enabled: isEditing,
  });

  const student = studentQuery.data;
  const studentAddr = addressQuery.data;

  function extractCep(addr?: AddressResponse | null): string {
    if (!addr) return "";
    const a = addr as AddressResponse & { cep?: string };
    return a.cep ?? addr.cep ?? "";
  }

  useEffect(() => {
    if (studentAddr) {
      setAddress({
        cep: extractCep(studentAddr),
        street: studentAddr.street ?? "",
        number: studentAddr.number ?? "",
        state: studentAddr.state ?? "",
        city: studentAddr.city ?? "",
        neighborhood: studentAddr.neighborhood ?? "",
        complement: studentAddr.complement ?? "",
      });
    }
  }, [studentAddr]);


  function handleAddDoc() {
    if (!docForm.fileName) return;


    setDocuments((docs) => [
      ...docs,
      {
        ...docForm,
        id: Date.now(),
      } as Document,
    ]);

    setDocForm({ fileName: "", fileType: "", origin: "", date: "", description: "" });
    setShowUploader(false);
  };

  async function registerStudent(studentData: Partial<Student>, addressData: Partial<Address>): Promise<Id> {
    try {
      if (!studentData.fullName) {
        throw new Error(strings.studentRegistration.errors.fullNameRequired);
      }

      if (!studentData.dateOfBirth || studentData.dateOfBirth === undefined) {
        throw new Error(strings.studentRegistration.errors.dateOfBirthRequired);
      }

      if (!studentData.registrationNumber) {
        throw new Error(strings.studentRegistration.errors.registrationNumberRequired);
      }

      if (!studentData.schoolYear) {
        throw new Error(strings.studentRegistration.errors.schoolYearRequired);
      }

      if (!studentData.gender) {
        throw new Error(strings.studentRegistration.errors.genderRequired);
      }
      if (!studentData.enrollmentDate || studentData.enrollmentDate === undefined) {
        throw new Error(strings.studentRegistration.errors.enrollmentDateRequired);
      }
      if (!addressData.cep) {
        throw new Error(strings.studentRegistration.errors.addressCepRequired);
      }

      if (!addressData.number) {
        throw new Error(strings.studentRegistration.errors.addressNumberRequired);
      }

      const newStudent = await apiRegisterStudent(studentData);
      if (!newStudent.id) {
        throw new Error("No ID returned from student registration");
      }


      const studentAddress = await registerAddress(newStudent.id, addressData);
      if (!studentAddress.id) {
        throw new Error("No ID returned from address registration");
      }


      showToast(strings.studentRegistration.successMessage, "success");

      return newStudent.id;
    } catch (error) {
      throw new Error("Error registering student: " + error);
    }
  }

  async function updateStudent(studentId: number, studentData: Partial<Student>, addressData: Partial<Address>): Promise<void> {
    try {
      if (!studentData.fullName) {
        throw new Error(strings.studentRegistration.errors.fullNameRequired);
      }

      if (!studentData.dateOfBirth || studentData.dateOfBirth === undefined) {
        throw new Error(strings.studentRegistration.errors.dateOfBirthRequired);
      }

      if (!studentData.registrationNumber) {
        throw new Error(strings.studentRegistration.errors.registrationNumberRequired);
      }

      if (!studentData.schoolYear) {
        throw new Error(strings.studentRegistration.errors.schoolYearRequired);
      }

      if (!studentData.gender) {
        throw new Error(strings.studentRegistration.errors.genderRequired);
      }
      if (!studentData.enrollmentDate || studentData.enrollmentDate === undefined) {
        throw new Error(strings.studentRegistration.errors.enrollmentDateRequired);
      }
      if (!addressData.cep) {
        throw new Error(strings.studentRegistration.errors.addressCepRequired);
      }

      if (!addressData.number) {
        throw new Error(strings.studentRegistration.errors.addressNumberRequired);
      }
      await apiUpdateStudent(studentId, studentData);
      const studentAddress = await getStudentAddress(studentId);
      if (studentAddress?.id) {
        await apiUpdateStudentAddress(studentAddress.id, addressData);
      }
      showToast(strings.studentRegistration.successMessage, "success");
    } catch (error) {
      throw new Error("Error updating student: " + error);
    }
  }

  function filterByPrefix<T extends Record<string, unknown>>(
    formData: FormData,
    prefix: string
  ): Partial<T> {
    const entries = Array.from(formData.entries());
    const filteredEntries = entries.filter(
      ([key, value]) => key.startsWith(prefix) && Boolean(value)
    );
    const reducedEntries = filteredEntries.reduce(
      (acc, [key, value]) => {
        const newKey = key.replace(prefix, "");
        acc[newKey] = value;
        return acc;
      },
      {} as Record<string, unknown>
    );
    return reducedEntries as Partial<T>;
  }

  async function handleActivateStudent() {
    if (!studentId) return;
    const confirm = window.confirm("Tem certeza que deseja ativar este educando?");
    if (!confirm) return;
  
    try {
      const studentData: Partial<Student> = {
        status: "ATIVO",
      };
      await apiActivateStudent(studentId, studentData);
      showToast("Aluno ativado com sucesso.", "success");
      await queryClient.invalidateQueries({ queryKey: ["students"] });
      goBack();
    } catch (err: unknown) {
      if (!(err instanceof Error)) {
        showToast("Erro interno no servidor.", "error");
        return;
      }
      showToast(err?.message , "error");
    } 
  }

  function formatDateToInput(dateString: string | undefined): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function handleDeactivateStudent() {
    if (!studentId) return;
    const confirm = window.confirm("Tem certeza que deseja desativar este educando?");
    if (!confirm) return;

    try {
      await apiDeactivateStudent(studentId);
      showToast("Aluno desativado com sucesso.", "success");
      await queryClient.invalidateQueries({ queryKey: ["students"] });
      goBack();
    } catch (err: unknown) {
      if (!(err instanceof Error)) {
        showToast("Erro interno no servidor.", "error");
        return;
      }
      showToast(err?.message , "error");
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const studentData = filterByPrefix<Student>(formData, "student.");
    const addressData = filterByPrefix<Address>(formData, "address.");

    if (isEditing) {
      updateStudent(studentId!, studentData, addressData)
        .then(() => {
          documents.forEach((document) => {
            addStudentDocument<Document>({ id: studentId! }, document);
          });
          goBack();
        })
        .catch((error) => {
          showToast(error.message, "error");
        });
      return;
    }
    registerStudent(studentData, addressData)
      .then((studentId) => {
        if (!studentId) {
          throw new Error("Student ID is undefined");
        }
        documents.forEach((document) => {
          addStudentDocument<Document>({ id: studentId }, document);
        });
        goBack();
      })
      .catch((error) => {
        showToast(error.message, "error");
      });
  }

  return {
    documents,
    showUploader,
    setShowUploader,
    docForm,
    setDocForm,
    handleAddDoc,
    handleSubmit,
    address,
    setAddress,
    isEditing,
    student,
    isLoadingStudent: studentQuery.isPending,
    studentError: studentQuery.error,
    isLoadingStudentAddress: addressQuery.isPending,
    studentAddressError: addressQuery.error,
    handleDeactivateStudent,
    formatDateToInput,
    handleActivateStudent,
  }
}

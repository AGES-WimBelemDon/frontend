import { useState, useEffect } from "react";             // 🟢 useEffect

import { useQuery, useQueryClient } from "@tanstack/react-query"; // 🟢 useQueryClient

import type { Document } from "./interface";
import { strings } from "../../constants";
import { useRoutes } from "../../hooks/useRoutes";
import { useToast } from "../../hooks/useToast";
import { fetchAddress, type Address, type AddressResponse } from "../../services/address"; // 🟢 AddressResponse
import {
  addStudentDocument,
  registerAddress,
  registerStudent as apiRegisterStudent,
  type Student,
  getStudentById,             // 🟢
  getStudentAddress,          // 🟢
  updateStudent as apiUpdateStudent, // 🟢
} from "../../services/students";

export function useStudentRegistration() {
  const { showToast } = useToast();
  const { goBack, getPathParamId } = useRoutes();        // 🟢 getPathParamId
  const queryClient = useQueryClient();                  // 🟢

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

  // 🟢 identifica se está editando
  const editingId = getPathParamId("alunos");
  const studentId = editingId ? Number(editingId) : null;
  const isEditing = Boolean(studentId);

  function getAddressDetails() {
    if (!address?.code) {
      return Promise.resolve(null);
    }

    if (address.code.length !== 8) {
      return Promise.resolve(null);
    }

    // 🟢 devolve a promise pra query
    return fetchAddress(address.code).then((addr) => {
      setAddress(addr);
      return addr;
    });
  }

  useQuery({
    queryKey: ["addressByCep", address?.code],
    queryFn: getAddressDetails,
  });

  // 🟢 busca aluno quando está editando
  const studentQuery = useQuery({
    queryKey: ["studentById", studentId],
    queryFn: () => getStudentById(studentId!),
    enabled: isEditing,
  });

  // 🟢 busca endereço do aluno ao editar
  const addressQuery = useQuery<AddressResponse | null>({
    queryKey: ["studentAddressById", studentId],
    queryFn: () => getStudentAddress(studentId!),
    enabled: isEditing,
  });

  const student = studentQuery.data;          // 🟢
  const studentAddr = addressQuery.data;      // 🟢

  // 🟢 quando vier o endereço do aluno, preenche o state address
  useEffect(() => {
    if (!studentAddr) return;
    setAddress({
      code: studentAddr.cep ?? "",
      street: studentAddr.street ?? "",
      number: studentAddr.number ?? "",
      state: studentAddr.state ?? "",
      city: studentAddr.city ?? "",
      neighborhood: studentAddr.neighborhood ?? "",
      complement: studentAddr.complement ?? "",
    });
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
  }

  async function registerStudent(studentData: Partial<Student>, addressData: Partial<Address>): Promise<number> {
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
      if (!addressData.code) {
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const studentData = filterByPrefix<Student>(formData, "student.");
    const addressData = filterByPrefix<Address>(formData, "address.");

    // 🟢 se for edição, chama updateStudent em vez de registerStudent
    if (isEditing && studentId) {
      apiUpdateStudent(studentId, studentData)
        .then(async () => {
          showToast(strings.studentRegistration.successMessage, "success");
          await queryClient.invalidateQueries({ queryKey: ["students"] });
          goBack();
        })
        .catch((error: unknown) => {
          const errorMessage = error instanceof Error ? error.message : strings.studentRegistration.errors.internalError;
          showToast(errorMessage, "error");
        });
      return;
    }

    // 🟢 se NÃO estiver editando, continua o fluxo de cadastro normal
    registerStudent(studentData, addressData)
      .then((createdStudentId) => {
        if (!createdStudentId) {
          throw new Error("Student ID is undefined");
        }
        documents.forEach((document) => {
          addStudentDocument<Document>({ id: createdStudentId }, document);
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
    isEditing,          // 🟢 exposto pro componente
    student,            // 🟢 idem
  };
}
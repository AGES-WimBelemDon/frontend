import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import type { Document } from "./interface";
import { strings } from "../../constants";
import { useRoutes } from "../../hooks/useRoutes";
import { useToast } from "../../hooks/useToast";
import { fetchAddress } from "../../services/address";
import { addStudentDocument, registerAddress , registerStudent as apiRegisterStudent } from "../../services/students";
import type { Address } from "../../types/address";
import type { Student } from "../../types/students";

export function useStudentRegistration() {
  const { showToast } = useToast()
  const { goBack } = useRoutes();

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

  function getAddressDetails() {
    if (!address?.code) {
      return Promise.resolve(null);
    }

    if (address.code.length !== 8) {
      return Promise.resolve(null);
    }

    fetchAddress(address.code).then(setAddress);
  }
  
  useQuery({
    queryKey: ["address", address?.code],
    queryFn: getAddressDetails,
  })
  
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
      // if (!studentData.enrollmentDate || studentData.enrollmentDate === undefined) {
      //   throw new Error(strings.studentRegistration.errors.enrollmentDateRequired);
      // }
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
  }
}

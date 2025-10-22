import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import type { Document } from "./interface";
import { strings } from "../../constants";
import { useToast } from "../../hooks/useToast";
import { fetchAddress, type Address } from "../../services/address";
import type { EmploymentStatus, Gender, Race, SocialProgram } from "../../services/filters";
import { addStudentDocument, registerStudent as apiRegisterStudent } from "../../services/students";
import type { EducationLevel, Student } from "../../services/students";

export function useStudentEdition() {
  const { showToast } = useToast()

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

  async function registerStudent(studentLikeObject: {
    [k: string]: FormDataEntryValue;
  }) {
    try {
      const student: Partial<Student> = {
        address: {
          code: studentLikeObject.code as string,
          street: studentLikeObject.street as string,
          number: studentLikeObject.number as string,
          complement: studentLikeObject.complement as string,
        },
        fullName: studentLikeObject.fullName as string,
        dateOfBirth: new Date(studentLikeObject.dateOfBirth as string),
        registrationNumber: studentLikeObject.registrationNumber as string,
        enrollmentDate: new Date(studentLikeObject.enrollmentDate as string),
        race: studentLikeObject.race as Race,
        schoolName: studentLikeObject.schoolName as string,
        schoolYear: studentLikeObject.schoolYear as EducationLevel,
        socialProgram: studentLikeObject.socialProgram as SocialProgram,
        gender: studentLikeObject.gender as Gender,
        employmentStatus: studentLikeObject.employmentStatus as EmploymentStatus,
      }

      const newStudent = await apiRegisterStudent(student);

      if (!newStudent.id) {
        throw new Error("No ID returned from student registration");
      }

      showToast(strings.studentRegistration.successMessage, "success");

      return newStudent.id;
    } catch (error) {
      throw new Error("Error registering student: " + error);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const studentData = Object.fromEntries(formData.entries());
    
    registerStudent(studentData)
      .then((studentId) => {
        documents.forEach((document) => {
          addStudentDocument<Document>({ id: studentId }, document);
        });
      })
      .catch(() => {
        showToast(strings.studentRegistration.errorMessage, "error")
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

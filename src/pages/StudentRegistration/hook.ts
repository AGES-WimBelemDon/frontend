import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import type { Document } from "./interface";
import { strings } from "../../constants";
import { useRoutes } from "../../hooks/useRoutes";
import { useToast } from "../../hooks/useToast";
import { fetchAddress, type Address } from "../../services/address";
import type { EmploymentStatus, Gender, Race, SocialPrograms } from "../../services/filters";
import { addStudentDocument, registerAddress , registerStudent as apiRegisterStudent, type SchoolYear, type Student } from "../../services/students";

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

  async function registerStudent(studentLikeObject: {
    [k: string]: FormDataEntryValue;
  }): Promise<string | undefined> {
    try {
      
      const student: Partial<Student> = {
        fullName: studentLikeObject.fullName as string,
        dateOfBirth: studentLikeObject.dateOfBirth as string,
        registrationNumber: studentLikeObject.registrationNumber as string,
        // enrollmentDate: studentLikeObject.enrollmentDate as string,
        race: studentLikeObject.race as Race,
        schoolName: studentLikeObject.schoolName as string,
        schoolYear: studentLikeObject.schoolYear as SchoolYear,
        socialName: studentLikeObject.socialName as string,
        socialPrograms: studentLikeObject.socialPrograms as SocialPrograms, 
        gender: studentLikeObject.gender as Gender,
        employmentStatus: studentLikeObject.employmentStatus as EmploymentStatus,
      }
      const addressData = {
        cep: studentLikeObject.cep as string,
        street: studentLikeObject.street as string,
        number: studentLikeObject.number as string,
        complement: studentLikeObject.complement as string,
        city: studentLikeObject.city as string,
        state: studentLikeObject.state as string,
        neighborhood: studentLikeObject.neighborhood as string
      };
      console.log("Student to register:", student);
      console.log("Address to register:", addressData);

      if(!student.fullName) {
        showToast(strings.studentRegistration.errors.fullNameRequired, "error");
        return;
      }
      if (!student.dateOfBirth || student.dateOfBirth === undefined) {
        showToast(strings.studentRegistration.errors.dateOfBirthRequired, "error");
        return;
      }
      if (!student.registrationNumber) {
        showToast(strings.studentRegistration.errors.registrationNumberRequired, "error");
        return;
      }
      if (!student.schoolYear) {
        showToast(strings.studentRegistration.errors.schoolYearRequired, "error");
        return;
      }
      if (!student.gender) {
        showToast(strings.studentRegistration.errors.genderRequired, "error");
        return;
      }
      // if (!student.enrollmentDate || student.enrollmentDate === undefined) {
      //   showToast(strings.studentRegistration.errors.enrollmentDateRequired, "error");
      //   return;
      // }
      if (!addressData.cep) {
        showToast(strings.studentRegistration.errors.addressCepRequired, "error");
        return;
      }
      if (!addressData.number) {
        showToast(strings.studentRegistration.errors.addressNumberRequired, "error");
        return;
      }

      const newStudent = await apiRegisterStudent(student);
      const studentAddress = await registerAddress(newStudent.id, addressData);

      if (!newStudent.id) {
        throw new Error("No ID returned from student registration");
      }
      if (!studentAddress.id) {
        throw new Error("No ID returned from address registration");
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
        if (!studentId) {
          throw new Error("Student ID is undefined");
        }
        documents.forEach((document) => {
          addStudentDocument<Document>({ id: studentId }, document);
        });
        goBack();
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


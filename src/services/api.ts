import axios, { type AxiosInstance } from "axios";

import { getAuthToken } from "./auth.firebase";
import type { FormType } from "../types/filters";

const endpoints = {
  activities: {
    base: "/activities",
    byId: (id: number) => `/activities/${id}`
  },
  address: {
    base: "/address",
    byId: (id: number) => `/address/${id}`,
  },
  anamnesis: {
    base: "/anamnesis"
  },
  assessment: {
    base: "/assessment",
    forms: "/assessment/forms",
    questionsByFormType: (formType: FormType) => `/assessment/forms/${formType}/questions`,
    submitByStudent: (studentId: number) => `/assessment/student/${studentId}/assessments`,
    createAnswersByStudent: (studentId: number) => `/assessment/student/${studentId}/answers`,
    getByStudent: (studentId: number) => `/assessment/student/${studentId}/assessments`,
  },
  classes: {
    base: "/classes",
    byUser: (userId: number) => `/classes/my-classes/${userId}`,
    byId: (id: number) => `/classes/${id}`,
    frequency: (id: number) => `/classes/${id}/frequency`,
  },
  enrollments: {
    base: "/enrollments",
    byId: (id: number) => `/enrollments/${id}`,
  },
  familyMembers: {
    base: "/family-member",
    byStudentId: (studentId: number) => `/family-member/student/${studentId}`,
    byId: (id: number) => `/family-member/${id}`,
    addressById: (id: number) => `/family-member/${id}/address`,
  },
  filters: {
    formTypes: "/filters/form-types",
    userStatus: "/filters/user-status",
    studentStatus: "/filters/student-status",
    frequencyStatus: "/filters/frequency-status",
    classState: "/filters/class-state",
    races: "/filters/races",
    genders: "/filters/genders",
    socialPrograms: "/filters/social-programs",
    employmentStatus: "/filters/employment-status",
    schoolYears: "/filters/school-years",
    educationLevels: "/filters/education-levels",
    noteTypes: "/filters/note-types",
    weekDays: "/filters/week-days",
    roles: "/filters/roles",
  },
  frequencies: {
    base: "/frequency",
    availableByUser: (userId: number) => `/frequency/available-classes/${userId}`,
    general: "/frequency/general-attendance",
    specific: "/frequency/class-attendance", 
  },
  levels: {
    base: "/level",
  },
  students: {
    base: "/students",
    byId: (studentId: number) => `/students/${studentId}`,
    byCpf: (cpf: string) => `/students/cpf/${cpf}`,
    addressById: (studentId: number) => `/students/${studentId}/address`,
  },
  users: {
    base: "/user",
    register: "/user/register",
    login: "/user/login",
    byId: (id: number) => `/user/${id}`,
    disableById: (id: number) => `/user/disable/${id}`,
    enableById: (id: number) => `/user/enable/${id}`,
  },
  address: (id: number) => `/address/${id}`,
}

const BASE_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;

const axiosClient: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/${API_VERSION}`,
  timeout: 3 * 60_000, // 3 minutes
});

// Add request interceptor to include auth token if present
axiosClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
    } catch (error) {
      console.error("Error fetching token for API:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for global error handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export {
  axiosClient as api,
  endpoints,
};

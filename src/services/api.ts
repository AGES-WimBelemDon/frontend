import axios, { type AxiosInstance } from "axios";

import { getAuthToken } from "./auth.firebase";
import type { Id } from "../types/id";

const endpoints = {
  activities: {
    base: "/activities",
    byId: (id: Id) => `/activities/${id}`,
    patch: (id: Id) => `/activities/${id}`,
  },
  address: {
    base: "/address",
    byId: (id: Id) => `/address/${id}`,
  },
  assessment: {
    base: "/assessment",
    forms: "/assessment/forms",
    questionsByFormType: (formType: string) => `/assessment/form/${formType}/questions`,
    submitByStudent: (studentId: Id) => `/assessment/student/${studentId}/assessments`,
    createAnswersByStudent: (studentId: Id) => `/assessment/student/${studentId}/answers`,
    getByStudent: (studentId: Id) => `/assessment/student/${studentId}/assessments`,
  },
  classes: {
    base: "/classes",
    byUser: (userId: Id) => `/classes/my-classes/${userId}`,
    byId: (id: Id) => `/classes/${id}`,
    frequency: (id: Id) => `/classes/${id}/frequency`,
  },
  enrollments: {
    base: "/enrollments",
    byId: (id: Id) => `/enrollments/${id}`,
  },
  familyMembers: {
    base: "/family-member",
    byStudentId: (studentId: Id) => `/family-member/student/${studentId}`,
    byId: (id: Id) => `/family-member/${id}`,
    addressById: (id: Id) => `/family-member/${id}/address`,
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
    availableByUser: "frequency/available-classes",
    general: "/frequency/general-attendance",
    specific: "/frequency/class-attendance",
  },
  levels: {
    base: "/level",
    civilStates: "/filters/civil-states",
    schoolYear: "/filters/school-year",
  },
  students: {
    base: "/students",
    byId: (studentId: Id) => `/students/${studentId}`,
    byCpf: (cpf: string) => `/students/cpf/${cpf}`,
    addressById: (studentId: Id) => `/students/${studentId}/address`,
  },
  users: {
    base: "/user",
    register: "/user/register",
    login: "/user/login",
    byId: (id: Id) => `/user/${id}`,
    disableById: (id: Id) => `/user/disable/${id}`,
    enableById: (id: Id) => `/user/enable/${id}`,
  },
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
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      if (error.response.data?.message && Array.isArray(error.response.data.message)) {
        console.error("Error messages:", error.response.data.message);
      }
      console.error("Response headers:", error.response.headers);
    }
    return Promise.reject(error);
  }
);

export {
  axiosClient as api,
  endpoints,
};

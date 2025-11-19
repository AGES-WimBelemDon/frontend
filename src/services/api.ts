import axios, { type AxiosInstance } from "axios";

import { getAuthToken, logout } from "./auth.firebase";
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
    studentAssesments: (studentId: Id, formType: string) => `/assessment/student/${studentId}/assessments?formType=${formType}`,
    createAnswersByStudent: (studentId: Id) => `/assessment/student/${studentId}/assessments`,
  },
  classes: {
    base: "/classes",
    byUser: (userId: Id) => `/classes/my-classes/${userId}`,
    byId: (id: Id) => `/classes/${id}`,
    frequency: (id: Id) => `/classes/${id}/frequency`,
  },
  enrollments: {
    base: "/enrollments",
    byClassId: (id: Id) => `/enrollments/?classId=${id}`,
    bystudentId: (id: Id) => `/enrollments/?studentId=${id}`,
    byStudentClassIds: (studentId: Id, classId: Id) => `/enrollments/?studentId=${studentId}&classId=${classId}`
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
    civilStates: "/filters/civil-states",
    schoolYear: "/filters/school-year",
  },
  frequencies: {
    base: "/frequency",
    availableByUser: "frequency/available-classes",
    general: "/frequency/general-attendance",
    specific: "/frequency/class-attendance",
  },
  levels: {
    base: "/level",
  },
  students: {
    base: "/students",
    byId: (studentId: Id) => `/students/${studentId}`,
    byCpf: (cpf: string) => `/students/cpf/${cpf}`,
    addressById: (studentId: Id) => `/students/${studentId}/address`,
  },
  documents: {
    base: "/documents",
    generatePreUpload: "/documents/generate-upload-url",
    confirmUpload: "/documents/confirm-upload",
    getDocumentsByStudent: (studentId: Id) => `/documents/student/${studentId}`,
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
    const response = error?.response;
    if (response) {
      console.error("Response status:", response.status);
      console.error("Response data:", response.data);
      if (response.data?.message && Array.isArray(response.data.message)) {
        console.error("Error messages:", response.data.message);
      }
      console.error("Response headers:", response.headers);

      if (response.status === 401) {
        try {
          logout().catch((e) => console.debug("Logout failed (ignored):", e));
        } catch (e) {
          console.debug("Error during logout handling:", e);
        }

        const pathname = window.location.pathname;
        const isLoginPage = pathname.includes("/login");
        if (!isLoginPage) {
          const currentPath = window.location.pathname + window.location.search;
          const loginPath = `/frontend/login?from=${encodeURIComponent(currentPath)}`;
          try {
            window.dispatchEvent(new CustomEvent("app:unauthorized", { detail: { loginPath } }));
          } catch {
            window.location.replace(loginPath);
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export {
  axiosClient as api,
  endpoints,
};

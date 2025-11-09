import axios, { type AxiosInstance } from "axios";

import { getAuthToken } from "./auth.firebase";

const endpoints = {
  activities: "/activities",
  anamnesis: "/anamnesis",
  classes: {
    all: "/classes",
    frequency: (id: number) => `/frequency/available-classes/${id}`,
  },
  filters: {
    race: "/filters/race",
    gender: "/filters/gender",
    socialPrograms: "/filters/social-program",
    employmentStatus: "/filters/employment-status",
    educationLevel: "/filters/education-level",
    identityTypes: "/filters/identity-types",
    documentTypes: "/filters/document-types",
    weekDays: "/filters/week-days",
    levels: "/filters/levels",
    civilStates: "/filters/civil-states",
    schoolYear: "/filters/school-year",
  },
  students: {
    base: "/students",
    byId: (studentId: number) => `/students/${studentId}`,
    byCpf: (cpf: string) => `/students/cpf/${cpf}`,
    address: (studentId: number) => `/students/${studentId}/address`,
  },
  users: {
    register: "/user/register",
    login: "/user/login",
    getAll: "/user",
    getById: (id: number) => `/user/${id}`,
    disable: (id: number) => `/user/disable/${id}`,
    enable: (id: number) => `/user/enable/${id}`,
  },
  frequencies: {
    getAvailableClasses: (id: number) => `/frequency/class-attendance/${id}`,
    generalAttendance: "/frequency/general-attendance",
    classAttendance: "/frequency/class-attendance"
  }
}

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10 * 60_000, // 10 minutes
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

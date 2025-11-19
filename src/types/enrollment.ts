import type { ApiClass, Classes } from "./classes"
import type { Id } from "./id"
import type { Student } from "./students"

export type ClassEnrollment = Pick<Classes, "id" | "name">

export type StudentEnrollent = Pick<Student, "id" | "fullName" | "status">

export type Enrollment = {
    enrollmentId: Id,
    student: StudentEnrollent,
    class: ClassEnrollment,
    enrollmentDate: string,
    endDate: string | null
}

export type EnrollmentDetails = Enrollment & Pick<ApiClass, "teachers">


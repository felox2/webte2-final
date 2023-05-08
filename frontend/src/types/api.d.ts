export interface Teacher {
  id: number
  first_name: string
  last_name: string
}

export interface Assignment {
  id: number
  title: string
  description: string
  max_points: number
  start_date: string
  end_date: string | null
  teacher_id: number
  exercise_set_id: number
  teacher: Teacher
}

export interface Exercise {
  id: number
  task: string
  solution?: string
}

export interface Submission {
  id: number
  assignment_id: number
  student_id: number
  exercise_id: number
  points: number | null
  provided_solution: string | null
  assignment: Assignment
  exercise: Exercise | null
}

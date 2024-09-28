export interface CourseType {
  _id: string;
  conditions: string[];
  description: string;
  directions: string[];
  fitting: string[];
  nameRU: string;
  nameEN: string;
  order: number;
  workouts: string[];
}

export type UserType = {
  _id: string;
  name: string | null;
  password: string;
  email: string | null;
  courses: CourseType[];
}

export type ExerciseType = {
  name: string;
  amount: number;
};

export type WorkoutType = {
  _id: string;
  name: string; 
  video: string;
  course: string;
  number: number;
  exercises?: ExerciseType[];
}

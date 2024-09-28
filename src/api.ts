import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child, update, set } from "firebase/database";
import { CourseType } from "./types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBljvgb03g4dm3do27NTuMVWJlgplEvFyU",
  authDomain: "fitness-pro-293bb.firebaseapp.com",
  databaseURL:
    "https://fitness-pro-293bb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitness-pro-293bb",
  storageBucket: "fitness-pro-293bb.appspot.com",
  messagingSenderId: "6910375119",
  appId: "1:6910375119:web:37f2b709b0075c6f4533ba",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const getCourses = async (): Promise<CourseType[]> => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, "courses"));
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  } catch (error) {
    console.error("Ошибка при получении курсов:", error);
    return [];
  }
};

export async function auth(
  email: string,
  password: string
): Promise<{
  name: string | null;
  _id: string;
  email: string | null;
  password: string;
  courses: CourseType[];
  token: string;
}> {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    const userCourses = await getUserCourses(userCredential.user.uid);
    return {
      _id: userCredential.user.uid,
      name: userCredential.user.displayName,
      password: password,
      email: userCredential.user.email,
      courses: userCourses,
      token: token,
    };
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<{ uid: string }> {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: name });
    return { uid: userCredential.user.uid };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export const getUserCourses = async (userId: string): Promise<CourseType[]> => {
  const userCoursesRef = ref(database, `users/${userId}/courses`);
  const coursesRef = ref(database, "courses"); // Путь к общим курсам
  try {
    const userCoursesSnapshot = await get(userCoursesRef);
    const coursesSnapshot = await get(coursesRef);

    if (userCoursesSnapshot.exists() && coursesSnapshot.exists()) {
      const userCourses = userCoursesSnapshot.val();
      const allCourses = coursesSnapshot.val();

      return Object.keys(userCourses).map((courseId) => {
        const course = allCourses[courseId];
        return {
          ...course,
          _id: courseId,
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error("Ошибка при получении курсов пользователя:", error);
    return [];
  }
};

export const addCourseToUser = async (userId: string, courseId: string) => {
  try {
    const userRef = ref(database, `users/${userId}/courses/${courseId}`);
    await update(userRef, { id: courseId });
  } catch (error) {
    console.error("Ошибка при добавлении курса пользователю:", error);
  }
};

export const removeCourseFromUser = async (
  userId: string,
  courseId: string
) => {
  try {
    const courseRef = ref(database, `users/${userId}/courses/${courseId}`);
    await set(courseRef, null);
  } catch (error) {
    console.error("Ошибка при удалении курса:", error);
  }
};

export async function getWorkout(id: string | undefined) {
  if (!id) {
    return null;
  }

  try {
    const workoutRef = ref(database, `workouts/${id}`);
    const workoutSnapshot = await get(workoutRef);
    if (workoutSnapshot.exists()) {
      return workoutSnapshot.val();
    } else {
      throw new Error("такой тренировки не существует");
    }
  } catch (error) {
    console.error("Ошибка при получении тренировки:", error);
  }
}

export async function getCourseProgress(userId: string) {
  const userCoursesProgressRef = ref(database, `users/${userId}/courses`);
  try {
    const userCoursesProgressSnapshot = await get(userCoursesProgressRef);
    if (userCoursesProgressSnapshot.exists()) {
      const userCourseProgres = userCoursesProgressSnapshot.val();
      return userCourseProgres;
    }
  } catch (e) {
    console.error("Ошибка при получении прогресса курса:", e);
    return null;
  }
}

export async function addWorkoutProgress(
  userId: string,
  courseId: string,
  workoutId: string,
  values: number[],
  isDone: boolean
) {
  try {
    const userProgressRef = ref(
      database,
      `users/${userId}/courses/${courseId}/workouts/${workoutId}`
    );
    await update(userProgressRef, { values: values, isDone: isDone });
  } catch (error) {
    console.error("Ошибка при добавлении курса пользователю:", error);
  }
}

export async function getWorkoutProgress(
  userId: string,
  courseId: string,
  workoutId: string
) {
  try {
    const userProgressRef = ref(
      database,
      `users/${userId}/courses/${courseId}/workouts/${workoutId}/values`
    );
    const snapshot = await get(userProgressRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Ошибка при получении прогресса пользователю:", error);
    return null;
  }
}
export const changePassword = async (
  newPassword: string,
  confirmPassword: string
): Promise<void> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Пользователь не аутентифицирован.");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("Пароли не совпадают. Пожалуйста, введите их заново.");
  }

  try {
    await updatePassword(user, newPassword);
  } catch (error: any) {
    console.error("Ошибка при изменении пароля:", error.message);
    throw error;
  }
};

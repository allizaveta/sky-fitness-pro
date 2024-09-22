import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";
import { CourseType } from "./types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
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
      console.log("Курсы отсутствуют");
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
): Promise<{ name: string | null; _id: string; email: string | null; password: string; courses: CourseType[]; token: string }> {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    return {
      _id: userCredential.user.uid,
      name: userCredential.user.displayName,
      password: password,
      email: userCredential.user.email,
      courses: [],
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

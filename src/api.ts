import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";
import { CourseType } from "./types";

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

// Функция для получения курсов
export const getCourses = async (): Promise<CourseType[]> => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, "courses"));
    if (snapshot.exists()) {
      return Object.values(snapshot.val()); // Возвращаем массив курсов
    } else {
      console.log("Курсы отсутствуют");
      return [];
    }
  } catch (error) {
    console.error("Ошибка при получении курсов:", error);
    return [];
  }
};

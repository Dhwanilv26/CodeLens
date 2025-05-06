import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUJu79lJ_Zwt56UJbCFbv5q19RU1gHN84",
  authDomain: "codelens-bc84d.firebaseapp.com",
  projectId: "codelens-bc84d",
  storageBucket: "codelens-bc84d.firebasestorage.app",
  messagingSenderId: "793868419330",
  appId: "1:793868419330:web:0217e5bfff6c0583e2021b",
  measurementId: "G-N9NS57JLS8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(
  file: File,
  setProgress?: (progress: number) => void,
): Promise<string> {
  try {
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setProgress?.(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            console.log("File available at:", downloadUrl);
            resolve(downloadUrl as string);
          });
        },
      );
    });
  } catch (error) {
    console.error("Error initiating upload:", error);
    throw error;
  }
}

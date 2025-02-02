import { collection, addDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";

const AddUser = async () => {
  try {
    await addDoc(collection(db, "users"), {
      username: "JohnDoe",
      email: "johndoe@example.com",
      createdAt: new Date(),
    });
    console.log("User added successfully!");
  } catch (e) {
    console.error("Error adding user: ", e);
  }
};

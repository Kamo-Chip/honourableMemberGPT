import { getDownloadURL, ref } from "firebase/storage";
import { auth, db, storage } from "../../firebase/firebaseClient";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Message } from "ai";

export const getDocument = async (fileName: string) => {
  try {
    const pathReference = ref(storage, `manifesto-documents/${fileName}`);
    const url = await getDownloadURL(pathReference);
    return url;
  } catch (error: any) {
    console.log(`Error fetching document ${fileName}:`, error);
    throw new Error(`Error fetching document ${fileName}: ${error.message}`);
  }
};

/** Chat History */
export const saveChatHistory = async (messages: Message[]) => {
  try {
    const chatRef = await addDoc(collection(db, "chats"), {
      chatStartedAt: serverTimestamp(),
      messages: messages,
    });
    return chatRef.id;
  } catch (e: any) {
    console.log("Could not save chat history: ", e.message);
    return "";
  }
};

export const updateChatHistory = async (id: string, messages: Message[]) => {
  try {
    await updateDoc(doc(db, "chats", id), {
      messages: messages,
    });
  } catch (e: any) {
    console.log("Could not update chat history: ", e.message);
  }
};

/** Sign Ins */
export const handleSignIn = async () => {
  try {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    return res.user;
  } catch (e: any) {
    console.log("Could not sign in user: ", e.message);
    throw new Error("Could not sign in user: ", e.message);
  }
};

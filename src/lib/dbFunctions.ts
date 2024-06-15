import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/firebaseClient";

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

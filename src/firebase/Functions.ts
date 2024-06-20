import { db } from './firebase'
import { getFirestore,doc, collection,setDoc,addDoc, getDocs, getDoc, query, where, deleteDoc, updateDoc } from 'firebase/firestore'
import { uploadBytes,ref as RRef, getDownloadURL, getStorage } from 'firebase/storage'
import { useCollection,useDocument } from 'vuefire'
import { User } from '@/type/types'
import { firebaseApp } from './firebase'
import { useActionStore } from '@/store/ActionStore'


export const getCollection = async (collectionName: string): Promise<any> => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map(doc => doc.data());
    return data;
  }
  export const updateRequestStatus = async (collectionName: string, documentId: string, newStatus: any) => {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef,newStatus);
      console.log(`Document ${documentId} in ${collectionName} updated successfully with new status: ${newStatus}`);
    } catch (error) {
      console.error(`Error updating document ${documentId} in ${collectionName}:`, error.message);
      throw error;
    }
  };
  export const getDocument = async (collectionName: string, id: string): Promise<any> => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.id)
    return docSnap.exists() ? {id:docSnap.id,...docSnap.data()} : null;
  }

  export const setDocument = async (collectionName: string, documentId: string, data: any) => {
    await setDoc(doc(db, collectionName, documentId), data);
  }
  
  export const setDocumentRandomId = async (collectionName: string, data: any) => {
    await addDoc(collection(db, collectionName), data);
  }
  
  export const queryCollectionByField = async (collectionName: string, fieldName: string, fieldValue: any): Promise<any> => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(fieldName, "==", fieldValue));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  }
const storage = getStorage(firebaseApp)
export const uploadImage = async (image: File) => {
    // const actionStore = useActionStore()
    const actionStore = useActionStore()
    const storageRef = RRef(storage, `images/${image.name}`);
  
    try {
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      console.log(downloadURL,'tn tn')
      actionStore.imageUrl = downloadURL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Re-throw the error for better handling (optional)
    }
  };

  export const deleteItems = async (collectionName: string, itemId: string) => {
    try {
      await deleteDoc(doc(db, collectionName, itemId));
      
      console.log(`Item with ID ${itemId} deleted from ${collectionName} collection`);
    } catch (error:any) {
      console.error(`Error deleting item from ${collectionName} collection:`, error.message);
    }
  };
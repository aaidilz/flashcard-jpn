import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";

const cardCollectionRef = collection(db, "cards");

class CardDataService {
  // Menambahkan kartu baru
  addCards = (newCard: DocumentData): Promise<DocumentData> => {
    return addDoc(cardCollectionRef, newCard);
  };

  // Memperbarui kartu berdasarkan ID
  updateCard = (
    id: string,
    updatedCard: Partial<DocumentData>
  ): Promise<void> => {
    const cardDoc = doc(db, "cards", id);
    return updateDoc(cardDoc, updatedCard);
  };

  // Menghapus kartu berdasarkan ID
  deleteCard = (id: string): Promise<void> => {
    const cardDoc = doc(db, "cards", id);
    return deleteDoc(cardDoc);
  };

  // Mengambil semua kartu
  getAllCards = async (): Promise<QuerySnapshot<DocumentData>> => {
    return getDocs(cardCollectionRef);
  };

  // Mengambil kartu berdasarkan ID
  getCard = async (id: string): Promise<DocumentData | undefined> => {
    const cardDoc = doc(db, "cards", id);
    const snapshot = await getDoc(cardDoc);
    return snapshot.exists() ? snapshot.data() : undefined;
  };
}

export default new CardDataService();

import React, { useEffect, useState } from "react";
import CardDataService from "./services/card";
import { DocumentData } from "firebase/firestore";

interface Card {
  id?: string;
  hiragana: string;
  kanji: string | null;
  katakana: string | null;
  romanji: string;
}

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [newCard, setNewCard] = useState<Card>({
    hiragana: "",
    kanji: "",
    katakana: "",
    romanji: "",
  });

  // Fetch semua data
  const fetchCards = async (): Promise<void> => {
    try {
      const data = await CardDataService.getAllCards();
      const cardList = data.docs.map((doc: DocumentData) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(cardList);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Tambah kartu ke Firestore
  const addCard = async () => {
    if (!newCard.hiragana || !newCard.romanji) {
      alert("Hiragana dan Romanji wajib diisi!");
      return;
    }
    try {
      await CardDataService.addCards(newCard);
      setNewCard({ hiragana: "", kanji: "", katakana: "", romanji: "" });
      fetchCards(); // Refresh data setelah menambah
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <div>
      <h1>Firestore Cards</h1>

      {/* Form Tambah Data */}
      <div>
        <input
          type="text"
          placeholder="Hiragana"
          value={newCard.hiragana}
          onChange={(e) => setNewCard({ ...newCard, hiragana: e.target.value })}
        />
        <input
          type="text"
          placeholder="Kanji (Opsional)"
          value={newCard.kanji || ""}
          onChange={(e) => setNewCard({ ...newCard, kanji: e.target.value })}
        />
        <input
          type="text"
          placeholder="Katakana (Opsional)"
          value={newCard.katakana || ""}
          onChange={(e) => setNewCard({ ...newCard, katakana: e.target.value })}
        />
        <input
          type="text"
          placeholder="Romanji"
          value={newCard.romanji}
          onChange={(e) => setNewCard({ ...newCard, romanji: e.target.value })}
        />
        <button onClick={addCard}>Tambah</button>
      </div>

      {/* Daftar Data */}
      <ul>
        {cards.length > 0 ? (
          cards.map((card) => (
            <li key={card.id}>
              <p><strong>Hiragana:</strong> {card.hiragana}</p>
              <p><strong>Kanji:</strong> {card.kanji ?? "Tidak tersedia"}</p>
              <p><strong>Katakana:</strong> {card.katakana ?? "Tidak tersedia"}</p>
              <p><strong>Romanji:</strong> {card.romanji}</p>
            </li>
          ))
        ) : (
          <p>Loading or no data available...</p>
        )}
      </ul>
    </div>
  );
};

export default App;
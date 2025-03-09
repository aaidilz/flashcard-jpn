import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Spinner } from "react-bootstrap";
import CardDataService from "../services/card";

interface Card {
  id?: string;
  hiragana: string;
  kanji: string;
  katakana: string;
  romanji: string;
  bahasa: string;
}

function MainCard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch data dari Firestore
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await CardDataService.getAllCards();
        setCards(data.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Card)));
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const nextCard = () => {
    if (cards.length > 0) {
      setIndex((prev) => (prev + 1) % cards.length);
      setFlipped(false);
    }
  };

  const prevCard = () => {
    if (cards.length > 0) {
      setIndex((prev) => (prev - 1 + cards.length) % cards.length);
      setFlipped(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-6">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <motion.div
              className="card"
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  {cards.length > 0 ? cards[index].kanji : "No data"}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {cards.length > 0 ? cards[index].hiragana : ""}
                </h6>
                <p className="card-text">
                  {flipped
                    ? cards.length > 0
                      ? cards[index].bahasa
                      : ""
                    : cards.length > 0
                    ? cards[index].romanji
                    : ""}
                </p>
                <Button
                  variant="primary"
                  onClick={() => setFlipped((prev) => !prev)}
                >
                  {flipped ? "Show Romanji" : "Show Bahasa"}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-6">
          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={prevCard}
              disabled={cards.length <= 1}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={nextCard}
              disabled={cards.length <= 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCard;

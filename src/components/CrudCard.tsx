import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import CardDataService from "../services/card";

interface Card {
  id?: string;
  hiragana: string;
  kanji: string;
  katakana: string;
  romanji: string;
  bahasa: string;
}

const CrudCard = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card>({
    hiragana: "",
    kanji: "",
    katakana: "",
    romanji: "",
    bahasa: "",
  });

  // Ambil data dari Firebase
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const data = await CardDataService.getAllCards();
    setCards(data.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Card)));
  };

  // Handle input perubahan
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCard({ ...currentCard, [e.target.name]: e.target.value });
  };

  // Tambah atau update card
  const handleSave = async () => {
    if (currentCard.id) {
      await CardDataService.updateCard(currentCard.id, currentCard);
    } else {
      await CardDataService.addCards(currentCard);
    }
    setShowModal(false);
    fetchCards();
  };

  // Hapus card
  const handleDelete = async (id: string) => {
    await CardDataService.deleteCard(id);
    fetchCards();
  };

  return (
    <div className="container mt-4">
      <h2>Flashcards</h2>
      <Button
        variant="primary"
        onClick={() => {
          setCurrentCard({
            hiragana: "",
            kanji: "",
            katakana: "",
            romanji: "",
            bahasa: "",
          });
          setShowModal(true);
        }}
      >
        Tambah Card
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Kanji</th>
            <th>Hiragana</th>
            <th>Katakana</th>
            <th>Romanji</th>
            <th>Bahasa</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td>{card.kanji}</td>
              <td>{card.hiragana}</td>
              <td>{card.katakana}</td>
              <td>{card.romanji}</td>
              <td>{card.bahasa}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => {
                    setCurrentCard(card);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(card.id!)}>
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Form Tambah/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentCard.id ? "Edit Card" : "Tambah Card"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Kanji</Form.Label>
              <Form.Control
                type="text"
                name="kanji"
                value={currentCard.kanji}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Hiragana</Form.Label>
              <Form.Control
                type="text"
                name="hiragana"
                value={currentCard.hiragana}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Katakana</Form.Label>
              <Form.Control
                type="text"
                name="katakana"
                value={currentCard.katakana}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Romanji</Form.Label>
              <Form.Control
                type="text"
                name="romanji"
                value={currentCard.romanji}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Bahasa</Form.Label>
              <Form.Control
                type="text"
                name="bahasa"
                value={currentCard.bahasa}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CrudCard;
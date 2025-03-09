import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbars() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">FlashCard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/latihan">Latihan</Nav.Link>
            <Nav.Link as={Link} to="/crud">Tambah card</Nav.Link>
            <Nav.Link href="#pricing">...</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbars;

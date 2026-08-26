import { useState } from "react";
import "./NavbarHome.css";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CgProfile } from "react-icons/cg";
import { ImCart } from "react-icons/im";
import { VscSearchSparkle } from "react-icons/vsc";

function NavbarHome() {
  // Stato per gestire le checkbox relative ai filtri per categorie tramite hook

  const [categories, setCategories] = useState({
    tutti: true,
    concerti: false,
    festival: false,
    cinema: false,
    teatro: false,
  });

  // Funzione per aggiornare lo stato delel categorie
  const handleCategoriesChange = (category) => {
    if (category === "tutti") {
      // Se clicco su "Tutti", tutte le altre categorie diventeranno false, deselezionando le checkbox
      setCategories({
        tutti: true,
        concerti: false,
        festival: false,
        cinema: false,
        teatro: false,
      });
    } else {
      setCategories((prev) => ({
        ...prev, // Mantengo le altre categorie
        tutti: false, // Deseleziono la checkbox con "tutti"
        [category]: !prev[category], // Inverte il valore solo della checkbox cliccata
      }));
    }
  };

  return (
    <Navbar className="navbar-home ">
      <Container fluid className="px-0 flex-column align-items-center w-100">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <Navbar.Brand>
            <h1>EventZone</h1>
          </Navbar.Brand>
          <div>
            <Nav
              className="my-2 my-lg-0 "
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavDropdown
                align="end"
                title={<ImCart className="fs-4" />}
                id="cart-dropdown"
              >
                <NavDropdown.Item href="#action3">Lista</NavDropdown.Item>
                <NavDropdown.Item href="#action3">
                  Prezzo Totale
                </NavDropdown.Item>
                <NavDropdown.Item href="#action3">Checkout</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                align="end"
                title={<CgProfile className="fs-4" />}
                id="profile-dropdown"
              >
                <NavDropdown.Item href="#action4">
                  Profilo Personale
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Cronologia Acquisti
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Impostazioni
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">Esci</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        </div>
        <Form
          className="d-flex justify-content-center w-100"
          style={{ maxWidth: "500px" }}
        >
          <Form.Control
            type="search"
            placeholder="Cerca artisti, eventi, luoghi e molto altro"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-danger">
            <VscSearchSparkle className="fs-5" />
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavbarHome;

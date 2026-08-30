import { DropdownButton, Form } from "react-bootstrap";
import "./NavbarHome.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CgProfile } from "react-icons/cg";
import { ImCart } from "react-icons/im";
import { VscSearchSparkle } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PiSliders } from "react-icons/pi";

function NavbarHome() {
  const navigate = useNavigate();

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
    <Navbar className="navbar-home py-1">
      <Container fluid className="flex-column align-items-center w-100">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <Navbar.Brand className="py-0">
            <h1 className="home-title">EventZone</h1>
          </Navbar.Brand>
          <Form className=" d-flex justify-content-center align-items-center w-100 gap-1">
            <Form.Control
              type="search"
              placeholder="Cerca artisti, eventi, luoghi e molto altro"
              aria-label="Search"
              title={<VscSearchSparkle className="fs-5" />}
            />
            <DropdownButton
              variant="outline-info"
              title={<PiSliders className="fs-5" />}
              align={"end"}
              id="category-filter"
              size="sm"
            >
              <Form.Check
                type="checkbox"
                id="tutti"
                label="Tutti"
                checked={categories.tutti}
                onChange={() => handleCategoriesChange("tutti")}
                className="ms-2"
              />
              <Form.Check
                type="checkbox"
                id="concerti"
                label="Concerti"
                checked={categories.concerti}
                onChange={() => handleCategoriesChange("concerti")}
                className="ms-2"
              />
              <Form.Check
                type="checkbox"
                id="festival"
                label="Festival"
                checked={categories.festival}
                onChange={() => handleCategoriesChange("festival")}
                className="ms-2"
              />
              <Form.Check
                type="checkbox"
                id="teatro"
                label="Teatro"
                checked={categories.teatro}
                onChange={() => handleCategoriesChange("teatro")}
                className="ms-2"
              />
              <Form.Check
                type="checkbox"
                id="cinema"
                label="Cinema"
                checked={categories.cinema}
                onChange={() => handleCategoriesChange("cinema")}
                className="ms-2"
              />
            </DropdownButton>
          </Form>

          <Nav>
            <NavDropdown
              align="end"
              title={<ImCart className="fs-4" />}
              id="cart-dropdown"
            >
              <NavDropdown.Item href="#action3">Lista</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Prezzo Totale</NavDropdown.Item>
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
              <NavDropdown.Item href="#action4">Impostazioni</NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  localStorage.removeItem("token");
                  alert("Logout effettuato con successo");
                  navigate("/");
                }}
              >
                Esci
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarHome;

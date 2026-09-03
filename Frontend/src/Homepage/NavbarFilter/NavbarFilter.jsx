import Slider from "rc-slider";
import "./NavbarFilter.css";
import { Badge, Button, Container, Form, Navbar } from "react-bootstrap";
import "rc-slider/assets/index.css";
import { useState } from "react";
import { GrMoney } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { TbFilters } from "react-icons/tb";
import { IoFilterSharp } from "react-icons/io5";

function NavbarFilter() {
  // Stato per salvare i valori del range del prezzo per il filtro del budget
  const [priceRange, setPriceRange] = useState([0, 300]);

  return (
    <Navbar className="navbar-filter align-items-start min-vh-100 ">
      <Container fluid>
        <Form className="w-100 flex-column d-flex gap-4">
          <div className="text-start w-100 mb-4">
            <h3 className="d-flex align-items-center gap-2">
              FILTRI
              <IoFilterSharp />
            </h3>
            <h6 className="text-white-50 ">
              Gestisci i filtri per la tua ricerca
            </h6>
          </div>
          <div className="w-100 flex-column d-flex gap-2">
            <h6 className="text-white d-flex align-items-center gap-2">
              Budget <GrMoney />
            </h6>
            <div className="d-flex gap-1">
              <Badge bg="info" className="text-dark px-1 fs-6">
                {priceRange[0]} €
              </Badge>
              <span className="text-white">-</span>
              <Badge bg="info" className="text-dark px-1 fs-6">
                {priceRange[1] === 300 ? "300+ €" : `${priceRange[1]} €`}
              </Badge>
            </div>
            <Slider
              range
              min={0}
              max={300}
              defaultValue={[0, 300]}
              onChange={(price) => setPriceRange(price)}
              styles={{
                track: { backgroundColor: "purple" },
                handle: { borderColor: "purple", backgroundColor: "#fff" },
                opacity: 1,
                boxShadow: "0 0 5px rgba(225, 13, 240, 0.8)",
              }}
            />
          </div>
          <div className="w-100 flex-column d-flex gap-2">
            <h6 className="text-white d-flex align-items-center gap-2">
              Data <MdDateRange />
            </h6>
            <Form.Control type="date"></Form.Control>
          </div>
          <Button className="btn-gradient">RESET</Button>
          <Button className="btn-gradient">
            APPLICA
            <TbFilters />
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavbarFilter;

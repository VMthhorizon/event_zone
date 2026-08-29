import Slider from "rc-slider";
import "./NavbarFilter.css";
import { Container, Navbar } from "react-bootstrap";
import "rc-slider/assets/index.css";

function NavbarFilter() {
  return (
    <Navbar className="navbar-filter align-items-start">
      <Container fluid className="flex-column gap-4">
        <div className="text-start w-100">
          <h3>FILTRI</h3>
          <h6 className="text-white-50">
            Gestisci i filtri per la tua ricerca
          </h6>
        </div>
        <Slider
          range
          min={0}
          max={300}
          defaultValue={[0, 150]}
          styles={{
            track: { backgroundColor: "#0dcaf0" }, // Colore Cyan
            handle: { borderColor: "#0dcaf0", backgroundColor: "#fff" },
          }}
        />
      </Container>
    </Navbar>
  );
}

export default NavbarFilter;

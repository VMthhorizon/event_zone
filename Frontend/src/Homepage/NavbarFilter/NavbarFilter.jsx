import Slider from "rc-slider";
import "./NavbarFilter.css";
import { Badge, Button, Container, Form, Navbar } from "react-bootstrap";
import "rc-slider/assets/index.css";
import { useState, useEffect } from "react";
import { GrMoney } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { TbFilters } from "react-icons/tb";
import { IoFilterSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setMaxPrice,
  setSelectedDate,
  resetSideFilters,
} from "../../Redux/Slices/eventSlice";

function NavbarFilter() {
  const dispatch = useDispatch();
  const { maxPrice, selectedDate } = useSelector((state) => state.events);

  // Stati locali per gestire il Form prima della conferma
  const [tempPrice, setTempPrice] = useState(maxPrice || 300);
  const [tempDate, setTempDate] = useState(selectedDate || "");

  // Sincronizza lo stato locale se i filtri globali cambiano
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTempPrice(maxPrice);
    setTempDate(selectedDate);
  }, [maxPrice, selectedDate]);

  const handleApply = (e) => {
    e.preventDefault();
    dispatch(setMaxPrice(tempPrice));
    dispatch(setSelectedDate(tempDate));
  };

  const handleReset = () => {
    setTempPrice(300);
    setTempDate("");
    dispatch(resetSideFilters());
  };

  return (
    <Navbar className="navbar-filter align-items-start min-vh-100">
      <Container fluid>
        <Form className="w-100 flex-column d-flex gap-4" onSubmit={handleApply}>
          <div className="text-start w-100 mb-4">
            <h3 className="d-flex align-items-center gap-2">
              FILTRI <IoFilterSharp />
            </h3>
            <h6 className="text-white-50">
              Gestisci i filtri per la tua ricerca
            </h6>
          </div>

          {/* BUDGET */}
          <div className="w-100 flex-column d-flex gap-2">
            <h6 className="text-white d-flex align-items-center gap-2">
              Budget Massimo <GrMoney />
            </h6>
            <div className="d-flex gap-1">
              <Badge bg="info" className="text-dark px-2 fs-6">
                {tempPrice === 300
                  ? "Tutti i prezzi (300+ €)"
                  : `Fino a ${tempPrice} €`}
              </Badge>
            </div>
            <Slider
              min={0}
              max={300}
              value={tempPrice}
              onChange={(value) => setTempPrice(value)}
              styles={{
                track: { backgroundColor: "#f6825f" },
                handle: { borderColor: "#f54f1b", backgroundColor: "#fff" },
                boxShadow: "0 0 5px rgba(225, 13, 240, 0.8)",
              }}
            />
          </div>

          {/* DATA */}
          <div className="w-100 flex-column d-flex gap-2">
            <h6 className="text-white d-flex align-items-center gap-2">
              Data <MdDateRange />
            </h6>
            <Form.Control
              type="date"
              value={tempDate}
              onChange={(e) => setTempDate(e.target.value)}
            />
          </div>

          {/* PULSANTI AZIONE */}
          <Button type="button" variant="outline-light" onClick={handleReset}>
            RESET
          </Button>

          <Button
            type="submit"
            className="btn-gradient d-flex align-items-center justify-content-center gap-2"
          >
            APPLICA <TbFilters />
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavbarFilter;

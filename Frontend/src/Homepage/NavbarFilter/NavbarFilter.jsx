import Slider from "rc-slider";
import "./NavbarFilter.css";
import { Button, Container, Form, Navbar } from "react-bootstrap";
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
import { BiReset } from "react-icons/bi";

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
    <Navbar className="navbar-filter align-items-start min-vh-100 vh-100">
      <Container fluid>
        <Form className="w-100 flex-column d-flex gap-4" onSubmit={handleApply}>
          <div className="text-start w-100 mb-4">
            <h3 className="d-flex align-items-center gap-2 text-secondary">
              FILTRI <IoFilterSharp />
            </h3>
            <h6 className="text-white-50">
              Gestisci i filtri per la tua ricerca
            </h6>
          </div>

          <div className="w-100 flex-column d-flex gap-2">
            <h6 className="text-white d-flex align-items-center gap-2">
              Budget Massimo <GrMoney />
            </h6>
            <div className="d-flex gap-1 p-0 ">
              <h6 className="text-dark p-2 fs-6 bg-info rounded-3 fw-bolder">
                {tempPrice === 300
                  ? "Tutti i prezzi (300+ €)"
                  : `Fino a ${tempPrice} €`}
              </h6>
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

          <div className="w-100 flex-column d-flex gap-2 mb-4">
            <h6 className="text-white d-flex align-items-center gap-2">
              Data <MdDateRange />
            </h6>
            <Form.Control
              type="date"
              value={tempDate}
              onChange={(e) => setTempDate(e.target.value)}
            />
          </div>

          <Button
            type="button"
            className="btn-gradient d-flex align-items-center gap-1"
            onClick={handleReset}
          >
            <h5 className="btn-headers fs-6">Reset</h5>
            <BiReset />
          </Button>

          <Button
            type="submit"
            className="btn-gradient align-items-center d-flex gap-1"
          >
            <h5 className="btn-headers fs-6">Attiva</h5>
            <TbFilters />
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavbarFilter;

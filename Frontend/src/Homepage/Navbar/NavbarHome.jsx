import { Button, Dropdown, Form, Badge, Image } from "react-bootstrap";
import "./NavbarHome.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CgProfile } from "react-icons/cg";
import { ImCart } from "react-icons/im";
import { FaTrash } from "react-icons/fa";
import { VscSearchSparkle } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import { PiSliders } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Slices/userSlice";
import { removeFromCart } from "../../Redux/Slices/cartSlice";
import {
  setSearchTerm,
  setSelectedCategory,
} from "../../Redux/Slices/eventSlice";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosHome } from "react-icons/io";

function NavbarHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { searchTerm, selectedCategory } = useSelector((state) => state.events);

  const totalItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.event.price * item.quantity,
    0,
  );

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
  };

  if (location.pathname === "/") {
    return null;
  }

  const isHomepage = location.pathname === "/homepage";

  return (
    <Navbar className="navbar-home py-1">
      <Container fluid className="flex-column align-items-center w-100">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <Navbar.Brand
            className="py-0"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/homepage")}
          >
            <img className="navbar-logo-img" src="/logo.png" alt="Logo" />
          </Navbar.Brand>

          <div className="d-flex justify-content-center align-items-center flex-grow-1 mx-3">
            <AnimatePresence mode="wait">
              {isHomepage ? (
                <motion.div
                  key="searchbar"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Form
                    className="d-flex justify-content-center align-items-center w-100 gap-2"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="position-relative w-100 d-flex align-items-center">
                      <Form.Control
                        type="text"
                        placeholder="Cerca artisti, eventi, luoghi..."
                        aria-label="Search"
                        value={searchTerm || ""}
                        onChange={handleSearchChange}
                        className="pe-4"
                      />
                      <VscSearchSparkle
                        className="position-absolute end-0 me-3 text-muted fs-5"
                        style={{ pointerEvents: "none" }}
                      />
                    </div>

                    <Dropdown align="end">
                      <Dropdown.Toggle
                        variant="outline-info"
                        id="dropdown-category-filter"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <PiSliders className="fs-5" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="p-3 shadow-lg"
                        style={{ minWidth: "160px" }}
                      >
                        <Form.Check
                          type="radio"
                          name="category-group"
                          id="cat-tutti"
                          label="Tutti"
                          checked={selectedCategory === "tutti"}
                          onChange={() => handleCategoryChange("tutti")}
                          className="mb-2"
                        />
                        <Form.Check
                          type="radio"
                          name="category-group"
                          id="cat-concerti"
                          label="Concerto"
                          checked={selectedCategory === "concerto"}
                          onChange={() => handleCategoryChange("concerto")}
                          className="mb-2"
                        />
                        <Form.Check
                          type="radio"
                          name="category-group"
                          id="cat-festival"
                          label="Festival"
                          checked={selectedCategory === "festival"}
                          onChange={() => handleCategoryChange("festival")}
                          className="mb-2"
                        />
                        <Form.Check
                          type="radio"
                          name="category-group"
                          id="cat-teatro"
                          label="Teatro"
                          checked={selectedCategory === "teatro"}
                          onChange={() => handleCategoryChange("teatro")}
                          className="mb-2"
                        />
                        <Form.Check
                          type="radio"
                          name="category-group"
                          id="cat-cinema"
                          label="Cinema"
                          checked={selectedCategory === "cinema"}
                          onChange={() => handleCategoryChange("cinema")}
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form>
                </motion.div>
              ) : (
                <motion.div
                  key="backbutton"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="d-flex align-items-center gap-2 rounded-pill px-3 py-1 border-0"
                    onClick={() => navigate("/homepage")}
                  >
                    <IoIosHome className="fs-5" />
                    <h5 className="m-0">Torna alla Homepage</h5>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Nav>
            <NavDropdown
              align="end"
              id="cart-dropdown"
              title={
                <div className="position-relative d-inline-block px-1">
                  <ImCart className="fs-4" />
                  {totalItemsCount > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute bottom-0 start-100 translate-middle"
                      style={{ fontSize: "0.65rem", padding: "0.25em 0.4em" }}
                    >
                      {totalItemsCount}
                    </Badge>
                  )}
                </div>
              }
            >
              <div
                style={{
                  minWidth: "320px",
                  maxHeight: "380px",
                  overflowY: "auto",
                }}
              >
                {cartItems.length === 0 ? (
                  <NavDropdown.Item className="text-center text-muted py-3">
                    Il carrello è vuoto
                  </NavDropdown.Item>
                ) : (
                  cartItems.map(({ event, quantity }) => (
                    <NavDropdown.Item
                      key={event.eventId}
                      as="div"
                      className="d-flex align-items-center justify-content-between gap-2 py-2 border-bottom"
                    >
                      <Image
                        src={event.img}
                        alt={event.title}
                        rounded
                        style={{
                          width: "45px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                      />

                      <div className="flex-grow-1 overflow-hidden ms-1">
                        <div
                          className="fw-bold text-truncate"
                          style={{ fontSize: "0.9rem" }}
                        >
                          {event.title}
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.80rem" }}
                        >
                          {quantity}x €{event.price}
                        </div>
                      </div>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="border-0 p-1 ms-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(removeFromCart(event.eventId));
                        }}
                      >
                        <FaTrash size={14} />
                      </Button>
                    </NavDropdown.Item>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-2 border-top">
                  <div className="d-flex justify-content-between fw-bold mb-2 px-1">
                    <span>Totale:</span>
                    <span>€{totalPrice.toFixed(2)}</span>
                  </div>
                  <Button
                    className="btn-gradient w-100"
                    onClick={() => navigate("/checkout")}
                  >
                    Procedi al Checkout
                  </Button>
                </div>
              )}
            </NavDropdown>

            <NavDropdown
              align="end"
              title={<CgProfile className="fs-4" />}
              id="profile-dropdown"
            >
              <NavDropdown.Item onClick={() => navigate("/profilo")}>
                Profilo Personale
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/settings")}>
                Privacy
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  dispatch(logout());
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

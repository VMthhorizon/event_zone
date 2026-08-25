import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarHome from "./NavbarHomepage/NavbarHome";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="flex-column" style={{ minHeight: "200vh" }}>
      <NavbarHome />
      <Container
        fluid
        className="flex-column justify-content-center align-items-center"
      >
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            alert("Logout effettuato con successo");
            navigate("/");
          }}
          className="btn-gradient mt-3"
        >
          Esci dal profilo
        </Button>
      </Container>
    </div>
  );
}

export default Homepage;

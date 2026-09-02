import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeUserPass, deleteAccount } from "../services/userService";
import ChangePasswordModal from "./ChangePasswordModal";
import { fetchUserProfile, logout } from "../Redux/Slices/userSlice";
import Swal from "sweetalert2";

function Settings() {
  // Integrazione sweetAlert2
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger ",
    },
    buttonsStyling: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const { profile, loading } = useSelector((state) => state.user);

  const changePass = async (oldPass, newPass) => {
    await changeUserPass(oldPass, newPass);
  };

  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, profile]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "300px" }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="primary" role="status" />
          <p className="mt-2 text-muted small">Caricamento dati in corso...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid>
      <h1 className="text-center">IMPOSTAZIONI GENERALI</h1>
      <Row className="justify-content-center my-3">
        <Col xs={12} md={9} lg={7}>
          <div className="table-div">
            <div className="table-col-div">
              <span>NOME</span>
              <h4 className="mb-0">{profile?.name}</h4>
            </div>
            <div className="table-col-div">
              <span>COGNOME</span>
              <h4 className="mb-0">{profile?.surname}</h4>
            </div>
            <div className="table-col-div">
              <span>EMAIL</span>
              <h4 className="mb-0">{profile?.email}</h4>
            </div>
            <div className="table-col-div">
              <span>RUOLO</span>
              <h4 className="mb-0">{profile?.role}</h4>
            </div>
            <div className="d-flex justify-content-between ">
              <div className="d-flex flex-column p-3">
                <span>PASSWORD</span>
                <h4 className="mb-0">********</h4>
              </div>
              <Button
                onClick={() => setShowModal(true)}
                className="rounded-5 my-3"
                variant="outline-info"
              >
                Modifica
              </Button>
            </div>
            <Button
              onClick={() => {
                swalWithBootstrapButtons
                  .fire({
                    title: "Sicuro di voler cancellare l'account?",
                    text: "Avrai un massimo di 30 giorni per recuperarlo",
                    icon: "error",
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Conferma",
                    cancelButtonText: "Annulla operazione",
                    reverseButtons: true,
                  })
                  .then(async (result) => {
                    if (result.isConfirmed) {
                      try {
                        await deleteAccount();
                        await swalWithBootstrapButtons.fire({
                          title: "Eliminato",
                          text: "Il tuo account è stato cancellato",
                          icon: "success",
                        });

                        dispatch(logout());
                        navigate("/");
                      } catch (error) {
                        swalWithBootstrapButtons.fire({
                          title: "Annullata",
                          text: error.message,
                          icon: "error",
                        });
                      }
                    }
                  });
              }}
              variant="outline-danger"
            >
              ELIMINA ACCOUNT
            </Button>
          </div>

          <ChangePasswordModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onChangePassword={changePass}
          />
        </Col>
      </Row>
      <Button className="btn-gradient" onClick={() => navigate("/homepage")}>
        HOME
      </Button>
    </Container>
  );
}

export default Settings;

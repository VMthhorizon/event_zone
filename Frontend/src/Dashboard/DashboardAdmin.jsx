import { Container, Form, Row, Spinner, Table } from "react-bootstrap";
import "./DashboardAdmin.css";
import { useEffect, useState } from "react";
import { changeUserRole, getUsersList } from "../services/adminService";
import { useSelector } from "react-redux";

// Array dei ruoli
const ALL_ROLES = ["ADMIN", "ORGANIZER", "CUSTOMER"];

function DashboardAdmin() {
  const { loading } = useSelector((state) => state.user); // Prendo le informazioni dallo slice dello user

  const [listUsers, setListUsers] = useState(); // Stato per la lista degli utenti

  // Fetch per la lista degli utenti
  const fetchListUsers = async () => {
    try {
      const listResponse = await getUsersList();

      setListUsers(listResponse);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Funzione per gestire il cambio del ruolo in maniera asincrona
  const handleChangeRole = async (userId, newRole) => {
    try {
      const updatedUser = await changeUserRole(userId, newRole);

      setListUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, role: updatedUser.role } : u,
        ),
      );
    } catch (error) {
      alert("Impossibile modificare il ruolo: " + error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchListUsers();
  }, []);

  return (
    <Container fluid>
      <Row>
        <h3 className="mb-3 text-center">LISTA UTENTI</h3>
        {loading ? (
          <div className="text-center text-white my-4">
            <Spinner animation="border" size="sm" /> Caricamento utenti...
          </div>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            variant="dark"
            className="align-middle"
          >
            <thead>
              <tr className="text-center">
                <th>NOME</th>
                <th>COGNOME</th>
                <th>EMAIL</th>
                <th>RUOLO ATTUALE</th>
                <th>CAMBIA RUOLO</th>
              </tr>
            </thead>
            <tbody>
              {listUsers?.map((singleUser) => (
                <tr key={singleUser.id} className="text-start">
                  <td>{singleUser.nome || singleUser.name}</td>
                  <td>{singleUser.cognome || singleUser.surname}</td>
                  <td>{singleUser.email}</td>

                  <td className="fw-bold">{singleUser.role}</td>

                  <td>
                    <Form.Select
                      size="sm"
                      value={singleUser.role}
                      onChange={(e) =>
                        handleChangeRole(singleUser.id, e.target.value)
                      }
                      className="bg-dark text-white border-secondary"
                    >
                      <option value={singleUser.role} disabled>
                        Seleziona un nuovo ruolo
                      </option>

                      {ALL_ROLES.filter((r) => r !== singleUser.role).map(
                        (roleOption) => (
                          <option key={roleOption} value={roleOption}>
                            {roleOption}
                          </option>
                        ),
                      )}
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </Container>
  );
}

export default DashboardAdmin;

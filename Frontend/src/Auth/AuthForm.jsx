import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoSend } from "react-icons/io5";
import "./AuthForm.css";

function AuthForm() {
  return (
    <Card className="p-3 w-100 d-flex mb-3 card-auth card-form">
      <Form>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>
            <h5>Email</h5>
          </Form.Label>
          <Form.Control type="email" placeholder="Inserisci la tua email" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Password">
          <Form.Label>
            <h5>Password</h5>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci la tua password"
          />
        </Form.Group>
        <Button className="btn-gradient ">
          <h6> Conferma</h6>
          <IoSend className="login-register-icons-animation" />
        </Button>
      </Form>
    </Card>
  );
}

export default AuthForm;

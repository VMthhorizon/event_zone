import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoSend } from "react-icons/io5";
import "./AuthForm.css";

function AuthForm() {
  return (
    <Card className="p-3 w-50 d-flex mb-3 card-auth card-form">
      <Form>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button className="btn-gradient w-100">
          Conferma <IoSend className="login-register-icons-animation" />
        </Button>
      </Form>
    </Card>
  );
}

export default AuthForm;

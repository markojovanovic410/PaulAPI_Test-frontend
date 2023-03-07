import { Container, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useCookie } from "../states/cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrModal, setShowModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { setCookie } = useCookie();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_TEST_API}login`, { email, password })
      .then((res) => {
        if (!res.data.success) {
          setErrMsg("Incorrect Email and/or password");
          setShowModal(true);
          return;
        }

        let data = res.data.message;
        console.log(data);
        let cookie = "";
        data.reverse().map((ele) => {
          let temp = ele.split(";", undefined);
          cookie += temp[0] + "; ";
        });

        setCookie(cookie);
        navigate("/");
      });
  };

  const inputChangeHandler = (setFunction, e) => {
    setFunction(e.target.value);
  };

  return (
    <>
      <h1 className="page-title"> Sign In</h1>
      <div
        className="d-flex justify-content-center align-items-center signin-modal"
      >
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => inputChangeHandler(setEmail, e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => inputChangeHandler(setPassword, e)}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              SignIn
            </Button>
          </div>
        </Form>
      </div>

      <div style={{position:"relative"}}>
        
      <Modal show={showErrModal}>
        <Modal.Header closeButton>
          <Modal.Title>Err - Sign In Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errMsg}</Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="secondary"
            onClick={(e) => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
};

export default SignIn;

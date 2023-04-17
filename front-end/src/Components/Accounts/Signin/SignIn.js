import "./SignIn.scss";
import { useState } from "react";
import { Form, Button, Modal, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../../Images/Logo.png";
import axios from "axios";

const Signin = ({ handleUser, users, showSignIn, handleClose }) => {
  const API = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      await axios
        .put(`${API}/users/${foundUser.id}`, foundUser)
        // .patch(`${API}/users/${foundUser.id}`, {
        //   profileimg: foundUser.profileimg,
        //   username: foundUser.username,
        //   password: foundUser.password,
        //   email: foundUser.email,
        //   theme: foundUser.theme || null,
        //   wins: foundUser.wins,
        //   ties: foundUser.ties || 0,
        //   loss: foundUser.loss || 0,
        //   preferred_color: foundUser.preferred_color || null,
        //   last_online: new Date().toISOString(),
        // })
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          // console.log(err);
          setError(err.message);
        });
      notify(foundUser);
    } else {
      noUser();
    }
  };

  const notify = (foundUser) => {
    toast.success(
      "You have been signed in. \n You will be redirected in 3 seconds.",
      {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      }
    );
    setTimeout(() => {
      handleUser(foundUser);
    }, 4100);
  };

  const noUser = () => {
    toast.error(
      "No user with these credentials have been found. \n Please make sure your email and password are correct.",
      {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      }
    );
  };

  return (
    <section className="SigninSection">
      <Modal
        show={showSignIn}
        onHide={handleClose}
        centered
        className="landing-modal-container"
      >
        <Modal.Title className="landing-modal-title-signin">
          <h3 className="closeButton" onClick={handleClose}>
            X
          </h3>
          <Image src={Logo} alt="Logo" id="logoImgModal" />
          <h6>World Wide Chess</h6>
          <h1>Sign In</h1>
        </Modal.Title>
        <Modal.Body className="landing-modal-body-signin">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            <br />
            <Button variant="light" type="submit" id="landing-modal-button">
              Sign in
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer autoClose={3000} theme="dark" />
    </section>
  );
};

export default Signin;

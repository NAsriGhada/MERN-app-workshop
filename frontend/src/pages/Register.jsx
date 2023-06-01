import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/authSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Register = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      age,
      email,
      password,
    };

    dispatch(register(userData));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Sign Up</Button>
      </Form>
      <Link to={"/login"} className="btn btn-primary" type="button">
        Sign In
      </Link>
    </div>
  );
};

export default Register;

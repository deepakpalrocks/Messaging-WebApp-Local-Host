import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
import './Login.css'

const PREFIX = "chatapp-clone-";
export default function Login({ onIdSubmit }) {
  const idRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    console.log(idRef.current.value);

    // receiving data  from  backend
    const GetData = async (e) => {
      const res = await fetch("/sendDataToFrontEnd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: JSON.stringify(idRef.current.value) }),
      })
        .then((res) => res.text())
        .then((text) => {
          console.log(JSON.parse(text));
          if (JSON.parse(text) == "No Such user") {
            //  alert("No Such user exists in our database")
            console.log("No such user");
          } else {
            localStorage.setItem(
              PREFIX + "contacts",
              JSON.stringify(JSON.parse(JSON.parse(JSON.parse(text).contacts)))
            );
            localStorage.setItem(
              PREFIX + "conversations",
              JSON.stringify(
                JSON.parse(JSON.parse(JSON.parse(text).conversations))
              )
            );
            localStorage.setItem(
              PREFIX + "id",
              JSON.stringify(JSON.parse(JSON.parse(text).id))
            );
            onIdSubmit(idRef.current.value);
            console.log("Data recieved", JSON.parse(JSON.parse(text).id));
            console.log("Data recieved", JSON.parse(JSON.parse(text).contacts));
            console.log(
              "Data recieved",
              JSON.parse(JSON.parse(text).conversations)
            );
          }
        })
        .catch((e) => console.log(e));
    };
    GetData();
  }
  function createNewId() {
    onIdSubmit(uuidV4());
  }

  return (
    <div className="full">

    
    <Container
      className="container"
      // style={{ height: "100vh" }}
    > 
    <div className="circle circle1"></div>
    <div className="circle circle2"></div>
    <div className="heading"><h1>Login or Sign Up to continue</h1></div>
      <div className="form">

      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="label">Enter Your Id</Form.Label>
          <Form.Control className="inp" type="text" ref={idRef}></Form.Control>
        </Form.Group> 
        <Button className="btn" type="submit">Login</Button>
        <Button onClick={createNewId} variant="secondary">
          Create a new Id
        </Button>
      </Form>
      </div>
    </Container>
    </div>
  );
}

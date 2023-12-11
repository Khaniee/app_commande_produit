import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Users() {
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("online");
  const [show, setShow] = useState(false);
  const [isSubmited, setSubmited] = useState(false);

  async function setLocalStorage(datatostore) {
    // make image show in offline not working
    localStorage.setItem("users", JSON.stringify(datatostore));
  }

  useEffect(() => {
    if (isSubmited) {
      setLocalStorage(data);
    }
  }, [data]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((json) => {
        let dataOnline = json["users"];
        let dataLocalProducts = null;
        if (localStorage.getItem("users")) {
          dataLocalProducts =
            "users" in JSON.parse(localStorage.getItem("users"))
              ? JSON.parse(localStorage.getItem("users"))["users"]
              : null;
        }
        if (dataLocalProducts) {
          for (let key in dataLocalProducts) {
            let value = dataLocalProducts[key];
          }
        }
        let dataOnlineWithLocal = dataOnline;
        if (dataLocalProducts) {
          // Merge arrays and remove duplicates based on the "id" property
          dataOnlineWithLocal = [
            ...new Map(
              [...dataOnline, ...dataLocalProducts].map((obj) => [obj.id, obj])
            ).values(),
          ];
        }

        let dataToStore = { users: dataOnlineWithLocal };
        setLocalStorage(dataToStore);

        setData(dataToStore);
      })
      .catch((error) => {
        console.log(error);
        setMode("offline");
        let collection = localStorage.getItem("users");
        setData(JSON.parse(collection));
      });
  }, []);

  function findMaxId(arr) {
    let maxId = 0;

    arr.forEach((item) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });

    return maxId;
  }

  return (
    <div className="container mt-5">
      <Button variant="light" onClick={() => setShow(true)}>
        Ajouter
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Form
          onSubmit={async (event) => {
            event.preventDefault();
            setShow(false);
            let nextId =
              findMaxId(JSON.parse(localStorage.getItem("users"))["users"]) + 1;
            let imageUrl = URL.createObjectURL(event.target[6].files[0]);

            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const reader = new FileReader();
            reader.onloadend = () => {
              const dataUrl = reader.result;
              imageUrl = dataUrl;
            };
            reader.readAsDataURL(blob);
            await fetch(imageUrl);
            setData({
              users: [
                ...data["users"],
                {
                  id: nextId,
                  firstName: event.target[1].value,
                  lastName: event.target[2].value,
                  username: event.target[4].value,
                  email: event.target[3].value,
                  image: imageUrl,
                  password: event.target[5].value,
                },
              ],
            });
            setSubmited(true);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Creation Utilisateur</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control required type="text" placeholder="nom" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="prenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control required type="text" placeholder="prenom" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control required type="text" placeholder="username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control required type="file" placeholder="image" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Enregistrer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {mode === "offline" ? (
        <div className="alert alert-warning" role="alert">
          vous êtes en mode hors-ligne
        </div>
      ) : null}
      {data ? (
        <Table striped hover variant="dark" className="mt-2">
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Login</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {data.users
              .sort((a, b) => b.id - a.id) // Tri par id décroissant
              .map((user) => {
                return (
                  <tr>
                    <td>{user.id}</td>
                    <td>
                      <Image
                        src={user.image}
                        alt="not found"
                        thumbnail
                        style={{ width: "3rem", height: "3rem" }}
                      />
                    </td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
export default Users;

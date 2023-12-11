
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function Login() {
    const [connectedUser, setconnectedUser] = useState(null);

    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div style={{ color: "white" }}>
                {connectedUser ? (
                    <div>
                        Connected user :
                        <p>Username: {connectedUser.username}</p>
                        <p>Email: {connectedUser.email}</p>
                        <p>Lastname: {connectedUser.lastName}</p>
                        <p>FirstName: {connectedUser.firstName}</p>
                    </div>
                ) : null}
            </div>
            <div className='container' style={{ width: "30%" }}>
                <Card style={{ height: "20rem" }}>
                    <Card.Header>Login</Card.Header>
                    <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Form onSubmit={(event) => {
                            event.preventDefault();
                            let loginEntered = event.target[0].value
                            let passwordEntered = event.target[1].value


                            let listeUtilisateurs = null
                            if (localStorage.getItem('users')) {
                                listeUtilisateurs = "users" in JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users'))["users"] : null;
                            }

                            // Utilisez la méthode find pour trouver l'utilisateur correspondant
                            let utilisateurTrouve = null
                            if (listeUtilisateurs) {
                                utilisateurTrouve = listeUtilisateurs.find(
                                    utilisateur => utilisateur.username === loginEntered && utilisateur.password === passwordEntered
                                );
                            }

                            // Si utilisateurTrouve n'est pas undefined, cela signifie qu'un utilisateur correspondant a été trouvé
                            if (utilisateurTrouve) {
                                console.log("Utilisateur trouvé :", utilisateurTrouve);
                                setconnectedUser(utilisateurTrouve);
                            } else {
                                console.log("Aucun utilisateur trouvé pour le login et le mot de passe fournis.");
                            }

                        }}>
                            <Card.Title>Connectez-vous</Card.Title>
                            <Card.Text>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="3">
                                        Login
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control required type='text' placeholder="Login" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="3">
                                        Password
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control required type="password" placeholder="Password" />
                                    </Col>
                                </Form.Group>
                            </Card.Text>
                            <Button variant="primary" type="submit">Se connecter</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
export default Login;
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Users(){
    const [data, setData] = useState(null);
    const [mode, setMode] = useState('online');
    const [show, setShow] = useState(false);

    useEffect(() => { 
        fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(json =>{
            setData(json)
            localStorage.setItem("users", JSON.stringify(json))
        })
        .catch(error => {
            setMode('offline')
            let collection = localStorage.getItem('users');
            setData(JSON.parse(collection))
        });
    }, []);
    return(
        <div className='container mt-5'>
            <Button variant="light" onClick={() => setShow(true)}>Ajouter</Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Creation Utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="nom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" placeholder="nom" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="prenom">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control type="text" placeholder="prenom" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" placeholder="image" />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Annuler
                </Button>
                <Button variant="primary" onClick={() => setShow(false)}>
                    Enregistrer
                </Button>
                </Modal.Footer>
            </Modal>
        {
            mode==='offline' ?
            <div className="alert alert-warning" role="alert">
            vous êtes en mode hors-ligne
            </div>
            : null
            }
        {data ? 


    <Table striped  hover variant="dark" className='mt-2'>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Login</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        {data.users.map(user => (
          <tr>
            <td>{user.id}</td>
            <td>
                <Image src={user.image} alt="not found" thumbnail style={{width : "3rem", height : "3rem"}}/>
            </td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        )
        )}
        </tbody>
      </Table>
        : 'Loading...'}
        </div>
    )
}
export default Users;
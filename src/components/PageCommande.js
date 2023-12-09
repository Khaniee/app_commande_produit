import React, { useState, useEffect } from 'react';
import ProductCard from "../widgets/ProductCard";
// import Table from 'react-bootstrap/Table';
// import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
// var jdb = require("db-json");
// const fs = require('fs');

const style = {
    container: {
        width: "100%",
        // backgroundColor : "black",
        height: "100%",
        padding: "2rem",
    },
    containerCard: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    }
}
function PageCommande() {
    const [data, setData] = useState(null);
    const [mode, setMode] = useState('online');
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(json => {
                let dataOnline = json.products;
                let dataLocal = JSON.parse(localStorage.getItem('products')).products;
                let dataOnlineWithLocal = dataOnline.concat(dataLocal);
                let dataToStore = json;
                dataToStore.products = dataOnlineWithLocal
                localStorage.setItem("products", JSON.stringify(dataToStore))
                setData(dataToStore);
            })
            .catch(error => {
                setMode('offline')
                let collection = localStorage.getItem('products');
                setData(JSON.parse(collection))
            });
    }, []);
    return (
        <div style={style.container}>
            <Button variant="light" onClick={() => setShow(true)}>Ajouter</Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    setShow(false);

                    setData({
                        "products": [...data["products"], {
                            // "id": 1,
                            "title": event.target[1].value,
                            "description": event.target[3].value,
                            "price": event.target[4].value,
                            "discountPercentage": 12.96,
                            "rating": event.target[5].value,
                            "stock": 94,
                            "brand": "Apple",
                            "category": event.target[2].value,
                            "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg", // event.target[6].value
                        }]
                    });
                    localStorage.setItem("products", JSON.stringify(data))
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Creation Produit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="nom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control required type="text" placeholder="nom" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Select>
                                <option>smartphones</option>
                                <option>


                                </option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control required as="textarea" rows={3} placeholder="description du produit" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="prix">
                            <Form.Label>Prix</Form.Label>
                            <Form.Control required type="number" />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Note</Form.Label>
                            <Form.Control required type="number" placeholder="" min="0" max="5" />
                            <Form.Text className="text-muted">
                                Notez le produit entre 0 et 5
                            </Form.Text>
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
            {
                mode === 'offline' ?
                    <div className="alert alert-warning" role="alert">
                        vous êtes en mode hors-ligne
                    </div>
                    : null
            }
            {data ?
                <div style={style.containerCard}>
                    {data.products.map(product => (
                        product.category === "smartphones" || product.category === "laptops" ?

                            <ProductCard ProduitElt={product} key={product.id} />
                            :
                            null
                    )
                    )}
                </div>

                : 'Loading...'}
        </div>
    );
}
export default PageCommande;
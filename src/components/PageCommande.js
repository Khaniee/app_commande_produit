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
    container : {
        width : "100%",
        // backgroundColor : "black",
        height : "100%",
        padding : "2rem",
    },
    containerCard : {
        display : "flex", 
        flexWrap : "wrap",
        justifyContent : "space-around",
    }
}
function PageCommande(){
    const [data, setData] = useState(null);
    const [mode, setMode] = useState('online');
    const [show, setShow] = useState(false);

    useEffect(() => { 
        fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(json =>{
            setData(json)
            localStorage.setItem("products", JSON.stringify(json))
            // url to change dynamic
            // fetch("http://localhost:3000/products", {
            // method: "POST",
            // headers: { "Content-Type": "application/json" },
            // mode: "cors",
            // body: JSON.stringify(json.products),
            // })
            // fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            //     if (err) {
            //       console.error('Error writing data to file:', err);
            //       res.status(500).send('Error writing data');
            //     } else {
            //       console.log('Data written to data.json');
            //       res.send('Data written to data.json');
            //     }
            //   });
        })
        .catch(error => {
            setMode('offline')
            let collection = localStorage.getItem('products');
            setData(JSON.parse(collection))
            // fetch(`${process.env.PUBLIC_URL}/db.json`)
            // .then(response => response.json())
            // .then(json =>{
            //     setData(json)
            // }).catch(
            //     error => {
            //         alert("error")
            //         console.log(error)
            //     }
            // )
        });
    }, []);
    return(
        <div style={style.container}>
            <Button variant="light" onClick={() => setShow(true)}>Ajouter</Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Creation Produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="nom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" placeholder="nom" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Select>
                            <option>smartphones</option>
                            <option>laptops</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="description du produit" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="prix">
                        <Form.Label>Prix</Form.Label>
                        <Form.Control type="number"  />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Note</Form.Label>
                        <Form.Control type="number" placeholder="" min="0" max="5"/>
                        <Form.Text className="text-muted">
                        Notez le produit entre 0 et 5
                        </Form.Text>
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
        <div style={style.containerCard}>
        {data.products.map(product => (
            product.category  === "smartphones" ||  product.category  === "laptops" ?

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
import React, { useState, useEffect } from "react";
import ProductCard from "../widgets/ProductCard";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const style = {
  container: {
    width: "100%",
    height: "100%",
    padding: "2rem",
  },
  containerCard: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
};
function PageCommande() {
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("online");
  const [show, setShow] = useState(false);
  const [isSubmited, setSubmited] = useState(false);

  async function setLocalStorage(datatostore) {
    localStorage.setItem("products", JSON.stringify(datatostore));
  }
  useEffect(() => {
    if (isSubmited) {
      setLocalStorage(data);
    }
  }, [data]);

  useEffect(() => {
    console.log("CALLING USE EFFECT!");
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((json) => {
        let dataOnline = json["products"];
        let dataLocalProducts = null;
        if (localStorage.getItem("products")) {
          dataLocalProducts =
            "products" in JSON.parse(localStorage.getItem("products"))
              ? JSON.parse(localStorage.getItem("products"))["products"]
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

        let dataToStore = { products: dataOnlineWithLocal };
        setLocalStorage(dataToStore);
        setData(dataToStore);
      })
      .catch((error) => {
        console.log(error);
        setMode("offline");
        let collection = localStorage.getItem("products");
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
    <div style={style.container}>
      <Button variant="light" onClick={() => setShow(true)}>
        Ajouter
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Form
          onSubmit={async (event) => {
            event.preventDefault();
            setShow(false);
            let nextId =
              findMaxId(
                JSON.parse(localStorage.getItem("products"))["products"]
              ) + 1;
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
              products: [
                ...data["products"],
                {
                  id: nextId,
                  title: event.target[1].value,
                  description: event.target[3].value,
                  price: event.target[4].value,
                  discountPercentage: 12.96,
                  rating: event.target[5].value,
                  stock: 94,
                  brand: "Apple",
                  category: event.target[2].value,
                  thumbnail: imageUrl,
                },
              ],
            });
            setSubmited(true);
          }}
        >
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
                <option></option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="description du produit"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="prix">
              <Form.Label>Prix</Form.Label>
              <Form.Control required type="number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Note</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder=""
                min="0"
                max="5"
              />
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
      {mode === "offline" ? (
        <div className="alert alert-warning" role="alert">
          vous êtes en mode hors-ligne
        </div>
      ) : null}
      {data ? (
        <div style={style.containerCard}>
          {data.products
            .filter(
              (product) =>
                product.category === "smartphones" ||
                product.category === "laptops"
            )
            .sort((a, b) => b.id - a.id) // Tri par id décroissant
            .map((product) => {
              return <ProductCard ProduitElt={product} key={product.id} />;
            })}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
export default PageCommande;

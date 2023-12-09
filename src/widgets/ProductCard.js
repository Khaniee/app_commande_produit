import React from 'react';
import {FaStar } from 'react-icons/fa';
import './../ProductStyle.css';
import Button from 'react-bootstrap/Button';
const styles = {
    Card : {
        width : '25rem',
        height : "26rem",
        position : "relative",
        cursor : "pointer",
        borderRadius : "1.5rem 1.5rem 0 0",
        // boxShadow : "0 0px 10px 5px white",
        margin : "1.5rem"
    },
    ImageContainer : {
        backgroundColor : "white",
        borderRadius : "1.5rem 1.5rem 0 0",
        width : "100%",
        height : "15rem",
        overflow : "hidden"

    },
    descriptionContainer : {
        backgroundColor : "white",
        height : "11rem",
        borderRadius : "0 0 0.5rem 0.5rem ",
        padding : "0.5rem 1rem 0.5rem",
        overflow: "hidden",

    },
    badge : {
        height :  "1.5rem",
        backgroundColor : "#4d7ae8",
        borderRadius : "1rem",
        position: "absolute",
        right : "0.5rem",
        top : "-0.75rem",
        fontSize : "small",
        width : "auto",
        padding : "0 0.5rem 0",
        fontWeight : "bold",
        color : "white"
    },
    star : {
        marginLeft : "0.4rem",
    },
    price : {
        color : "red",
        fontWeight : "bold",
    }
}
function ProductCard({ProduitElt}){
    return(
        <div style = {styles.Card}  className="cardProduct">
            <div style={styles.badge}>
                {ProduitElt.category}
            </div>
            <div style={styles.ImageContainer}>
                <img src={ProduitElt.thumbnail} alt="not found" style={{width: "100%", height : "100%"}}/>
            </div>
            <div style={styles.descriptionContainer}>
                <div style={{ display : "flex", justifyContent : "space-between" }}>
                    <div style={{ fontWeight : "bold"}}>{ProduitElt.title}</div>
                    <div>
                    {Array.from({ length: Math.round(ProduitElt.rating) }).map((_, index) => (
                        <FaStar color='gold' style={styles.star}/>
                    ))}
                    {Array.from({ length: 5 - Math.round(ProduitElt.rating) }).map((_, index) => (
                        <FaStar color='grey' style={styles.star}/>
                    ))}
                    </div>
                </div>
                <div style={{ fontSize : "small" ,height : "50%", overflow : "hidden", textOverflow : "ellipsis"}}>
                {ProduitElt.description}
                </div>
                <div style={styles.price}>
                    $ {ProduitElt.price}
                </div>
                <div style={{textAlign : "center"}}>
                    <Button variant="danger" >
                        Commander
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default ProductCard;
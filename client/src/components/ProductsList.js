import React, { useState, useEffect } from "react";
import axios from "axios";

export function ProductsList() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imgOnLoad, setImgOnLoad] = useState(false);

    useEffect(() => {
        axios.get("/api/products")
        .then((res) => {
            setProducts(res.data);             
            setLoading(false);
            
        })
        .catch(err => setError(true));        
    }, []);


    if (error) {
        return (    
            <div className="App">
            404
        </div>
        )
    } else
        return (
            <div className="container">{!loading ? products.map( product => {
                return (
                    <div key={product.id} id={product.id}>
                        <a href={`/products/${product.id}`}>
                        <img src={product.image} 
                            key={product.id}
                            className="image" 
                            width='300px'
                            />
                        <div className="name" key={product.id}>{product.name}</div>
                        <div className="price" key={product.id}>${product.price}</div>
                        <div className="desc" key={product.id}>{product.description}</div>
                        <div className="desc" key={product.id}>{product.category}</div>
                        </a>
                    </div> 
                )
            }) : (
                <p>Loading...</p>
            )
        }</div>
        );
}


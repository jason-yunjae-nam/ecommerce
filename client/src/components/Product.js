import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

export function Product() {

    const { id } = useParams()
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("/products/"+id)
        .then((res) => {
            if (!res.ok) 
                throw new Error(res.status)
            else
                return res.json()
            })
        .then((data) => setProduct(data[0]))
        .catch(err => setError(true));        
    }, []);

    if (error) {
        return (    
            <div className="App">
            Product does not exist
        </div>
        )
    } else
        return (
            <div className="App">
            <div>{product.name}</div>
            <div>${product.price}</div>
            <div>{product.description}</div>
            </div>
        );
}

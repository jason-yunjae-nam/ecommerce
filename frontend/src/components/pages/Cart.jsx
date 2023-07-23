import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import Header from "../header/Header";


export function Cart() {
    const [localCart, setLocalCart] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartId, setCartId] = useState(0);
    const [userId, setUserId] = useState(null);

    // useEffect(() => {
    //     localStorage.setItem('ECOMMERCE_CART', JSON.stringify(localCart))
    // },[localCart])

    useEffect(() => {
        if (userId > 0) {
            let isMounted = true;
            const controller = new AbortController();
            const signal = controller.signal;

            // move localstorage items to db cart
            axios.post(
                "/api/carts/mycart/items/multi", 
                { items: localCart })
                .then(res => {
                    if (isMounted) {
                        console.log(res.data.cart)
                        setLocalCart([])
                        localStorage.removeItem('ECOMMERCE_CART')
                    }
                })
                .catch(err => console.log(err))    

            // get cart from db
            axios.get("/api/carts/mycart", {signal: signal})
                .then(res => {
                    if (isMounted) {
                        setCartId(res.data.rows[0].id);
                        setCart(res.data.items.reverse())
                    }
                })
                .catch(err => console.log(err))

            return () => {
                isMounted = false;
                isMounted && controller.abort()
            }
        } else {
            // get cart from local storage
            const data = localStorage.getItem('ECOMMERCE_CART')
            setLocalCart(JSON.parse(data ? data : "[]"))
            setCart(JSON.parse(data ? data : "[]").reverse())
        } 
    
    }, [setCart, setLocalCart, userId])

    //remove item from cart
    const removeItem = (cartitemid) => {
        axios.delete(`/api/carts/mycart/items/${cartitemid}`)
        .then(res => {
            setCart(cart.filter(x=> {
                if (x.cartitemid !== cartitemid)
                    return x;
            }))
        })
        .then(err => console.log(err))
    }

    const updateItem = (bool, cartitemid, qty, productid, cartid) => {
        if (bool)
            qty++;
        else {
            if (qty === 1)
                return;
            qty--
        }
        console.log({qty, productid, cartid})
        axios.put(`/api/carts/mycart/items/${cartitemid}`, 
            {qty, productid, cartid})
        .then(res => {
            setCart(cart.splice(0).map(x=> {
                if (x.cartitemid===cartitemid)
                    x['qty']=qty;
                return x;
            }))
        })
        .catch(err => console.log(err))

    }

    console.log(cart)

    return (
        <div>
        <Header userId={userId} setUserId={setUserId}/>
        <div>
            {cart.map(item => {
            return (
                <div key={item.cartitemid}>
                    <Link to={`/products/${item.id}`}>
                        <img src={item.image} width='300px'></img>
                        <div>{item.name}</div>
                        <div>{item.description}</div>
                    </Link>
                    <Link to={`/products?category=${item.category}`}>
                        <div>{item.category}</div>
                    </Link>
                    <div>
                        <button
                            onClick={() => updateItem(true, item.cartitemid, item.qty, item.id, cartId)}>
                            +
                        </button>
                        <button
                            onClick={() => updateItem(false, item.cartitemid, item.qty, item.id, cartId)}>
                            -
                        </button>
                        <div>Quantity: {item.qty}</div>
                    </div>
                    <button onClick={() => removeItem(item.cartitemid)}>Remove</button>
                </div>
            )
        })}</div>
        </div>
    )

}


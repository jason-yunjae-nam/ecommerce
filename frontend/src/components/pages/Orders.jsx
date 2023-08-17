import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import './Orders.css'

export function Orders({userId}) {
    const [ orders, setOrders ] = useState([])
    const [ selectedOrder, setSelectedOrder ] = useState(null)

    useEffect(() => {
        if (userId > 0) {
            let isMounted = true;
            const controller = new AbortController();
            const signal = controller.signal;

            axios.get('/api/orders', { signal })
            .then(res => {
                if (isMounted) {
                    setOrders(res.data)
                }
            })
            .catch(err => console.log(err))

            return () => {
                isMounted = false;
                isMounted && controller.abort()
            }
        }
    }, [userId, setOrders])

    const showOrder = (id) => {
        axios.get(`/api/orders/:${id}`)
        .then(res => {
            // setSelectedOrder(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }
    
    return (
        <div className="orders">
            
            <div className="head">
                <h1 id="title">My Orders</h1>
            </div>

            {userId === -1 ?  
                <>
                    <div className="item underline"><Link to="/login">Sign In</Link></div>
                    <div className="item underline"><Link to="/register">Register</Link></div> 
                </>
                : userId !== null ? 
                <>
                    {orders.length ? orders.slice(0).reverse().map(order => {
                        return <div key={order.id}>
                                    <div className="order" onClick={e => showOrder(order.id)}>
                                        <div>{order.created.slice(0, 10)}</div>
                                        <div>${order.total}</div>
                                    </div>
                                    {/* {selectedOrder? <div>{selectedOrder}</div> : null} */}
                                </div>
                    }) : null}
                </>
                : null
                }

        </div>
    )
}
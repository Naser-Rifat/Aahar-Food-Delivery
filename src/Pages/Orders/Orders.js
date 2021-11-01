import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const Orders = () => {
    const { user } = useAuth();
    const [order, setOrder] = useState([]);


    useEffect(() => {

        fetch(`http://localhost:5000/orders`)
            .then(res => res.json())
            .then(data => setOrder(data))


    })


    const handleDelete = (id) => {
        const procced = window.confirm("Are you sure? You want to Delete?")
        if (procced) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount === 1) {
                        const remaining = order.filter(service => service._id !== id)
                        setOrder(remaining);
                        alert('deleted successfully');
                    }

                })
        }


    }



    return (
        <div className="my-60">
            {
                order.map(item => user?.email === item.email ? <div className="d-flex w-75 m-5"
                    key={item._id}
                >
                    <img className="w-25" src={item.img} alt="" />

                    <div className="p-3">
                        <h1>{item.name}</h1>
                        <p>{item.description}</p>

                    </div>
                    <div>
                        <button onClick={() => handleDelete(item._id)} className="btn btn-primary my-5">Cancle</button>
                        {
                            item.status === "Confirmed" ? <button className="btn btn-success my-5">{item.status}</button> :
                                <button className="btn btn-warning my-5">{item.status}</button>

                        }
                    </div>
                </div>
                    : <></>
                )
            }
        </div>
    );
};

export default Orders;
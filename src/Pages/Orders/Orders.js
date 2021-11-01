import React, { useEffect, useState } from 'react';

const Orders = () => {

    const [order, setOrder] = useState([]);


    useEffect(() => {

        fetch(`https://macabre-skull-17452.herokuapp.com/orders`)
            .then(res => res.json())
            .then(data => setOrder(data))


    })


    const handleDelete = (id) => {
        const procced = window.confirm("Are you sure? You want to Delete?")
        if (procced) {
            fetch(`https://macabre-skull-17452.herokuapp.com/orders/${id}`, {
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
        <div>
            {
                order.map(item => <div className="d-flex w-75 m-5"
                    key={item._id}
                >
                    <img className="w-25" src={item.img} alt="" />

                    <div className="p-3">
                        <h1>{item.name}</h1>
                        <p>{item.description}</p>

                    </div>
                    <div>
                        <button onClick={() => handleDelete(item._id)} className="btn btn-primary my-5">Cancle</button>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Orders;
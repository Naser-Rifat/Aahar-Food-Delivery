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
        <div className="my-40">
            {
                order.map(item => user?.email === item.email ?
                    <div className=" row m-3 gap-2 border-1 rounded"
                        key={item._id}
                    >
                        <div className="col-lg-8 d-flex  p-2 ">
                            <img className="w-20" src={item.img} alt="" />


                            <div className="d-flex flex-sm-colum justify-content-center align-items-center p-3">
                                <h3 className="font-bold text-red-500 mx-2">{item.itemname}</h3>
                                <h3 className="font-bold">Price: {item.price}</h3>
                            </div>

                        </div>
                        <div className="col-lg-3 text-center mx-auto">
                            <button onClick={() => handleDelete(item._id)} className="btn btn-primary my-5 mx-2">Cancle</button>
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
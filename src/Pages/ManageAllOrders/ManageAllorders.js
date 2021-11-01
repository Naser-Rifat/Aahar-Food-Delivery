import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const ManageAllorders = () => {
    const { user } = useAuth();

    const [allorder, setAllOrder] = useState([]);


    useEffect(() => {

        fetch(`http://localhost:5000/orders`)
            .then(res => res.json())
            .then(data => setAllOrder(data))


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
                        const remaining = allorder.filter(service => service._id !== id)
                        setAllOrder(remaining);
                        alert('deleted successfully');
                    }

                })
        }


    }

    const handleConfirm = (id) => {
        const updateItem = {
            email: user?.email,
            username: user?.displayName,
            itemname: allorder.itemname,
            description: allorder.description,
            img: allorder.img,
            status: "Confirmed"
        }

        fetch(`http://localhost:5000/orders/${id}`, {
            method: "PUT",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(updateItem)

        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount > 0) {
                    alert(" updated");
                }


            })


    }
    return (
        <div className="my-60">
            {
                allorder.map(item => <div className="d-flex w-75 m-5"
                    key={item._id}
                >
                    <img className="w-25" src={item.img} alt="" />

                    <div className="p-3">
                        <h1>{item.itemname}</h1>
                        <p>{item.description}</p>

                    </div>
                    <div>
                        <button onClick={() => handleDelete(item._id)} className="btn btn-primary my-5">Delete</button>

                        {
                            item.status === "Confirmed" ? <button onClick={() => handleConfirm(item._id)} className="btn btn-success my-5">{item.status}</button> : <button onClick={() => handleConfirm(item._id)} className="btn btn-warning my-5">{item.status}</button>
                        }
                    </div>
                </div>

                )
            }
        </div>
    );
};

export default ManageAllorders;
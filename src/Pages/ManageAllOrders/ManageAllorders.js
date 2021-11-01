import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const ManageAllorders = () => {
    const { user, setIsloading } = useAuth();

    const [allorder, setAllOrder] = useState([]);



    useEffect(() => {

        fetch(`http://localhost:5000/orders`)
            .then(res => res.json())
            .then(data => setAllOrder(data))
            .finally(() => setIsloading(false))


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
                        console.log(remaining);
                        setAllOrder(remaining);
                        alert('deleted successfully');
                    }

                })
        }


    }

    const handleConfirm = (id) => {

        const currentItem = allorder.find(item => item._id === id)
        console.log(currentItem);

        const updateItem = {
            email: user?.email,
            username: user?.displayName,
            itemname: currentItem.itemname,
            description: currentItem.description,
            img: currentItem.img,
            status: "Confirmed",
            price: currentItem.price,
            address: currentItem.address
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
                allorder.map(item =>
                    <div className="row  m-5 border-1 rounded"
                        key={item._id}
                    >
                        <div className="col-lg-7">
                            <div className="d-flex ">
                                <img className="w-12 h-12 my-auto" defaultValue={item.img} src={item.img} alt="" />
                                <div className="p-2">
                                    <div className=" flex-md-colum mx-2">
                                        <h4 className="font-bold text-red-600 mx-2">{item.itemname}</h4>
                                        <div>
                                            <p className=" mx-2  my-auto"> Email: <i className="font-bold">{item.email}</i></p>
                                            <p className=" mx-2  my-auto">Username: <i className="font-bold">{item.username}</i></p>
                                            <p className=" mx-2  my-auto">address: <i className="font-bold">{item.address}</i></p>
                                            <p className=" mx-2  my-auto">Price: <i className="font-bold">{item.price}</i></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center mx-auto">
                            <button onClick={() => handleDelete(item._id)} className="btn btn-primary my-5 mx-2">Delete</button>

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
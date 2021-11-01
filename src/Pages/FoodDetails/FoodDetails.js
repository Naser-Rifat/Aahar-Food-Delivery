import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const FoodDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    console.log(item);

    useEffect(() => {
        fetch(`https://macabre-skull-17452.herokuapp.com/items/${id}`)
            .then(res => res.json())
            .then(data => setItem(data))
    }, [])

    const handleOrders = () => {

        fetch('https://macabre-skull-17452.herokuapp.com/orders', {

            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(item)
        }

        )
            .then(res => res.json())
            .then(data => {

                if (data.insertedId) {
                    alert("Add to the cart")
                }
            })


    }

    return (
        <div className="d-flex justify-content">
            <div className="w-50 mx-auto    ">
                <img className="" src={item.img} alt="" />
                <h1>{item.name}</h1>
                <h3 className="w-75 text-justify">{item.description}</h3>
                <button onClick={handleOrders} className="btn btn-primary">
                    Add to cart </button>
            </div>

            <div>
                <Link to={`/cartorder/${id}`}>
                    <button className="btn btn-primary">Place Order</button>
                </Link>

            </div>

        </div>
    );
};

export default FoodDetails;
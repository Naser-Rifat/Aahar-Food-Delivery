import Button from '@restart/ui/esm/Button';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';

const FoodDetails = () => {
    const { user, setIsloading } = useAuth();
    const { id } = useParams();
    const [item, setItem] = useState({});


    const emailRef = useRef();
    const usernameRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const addressRef = useRef();

    console.log(item);

    useEffect(() => {
        fetch(`http://localhost:5000/items/${id}`)
            .then(res => res.json())
            .then(data => setItem(data))
            .finally(() => setIsloading(false))

    }, [])


    const handleOrders = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const itemname = nameRef.current.value;
        const price = priceRef.current.value;
        const address = addressRef.current.value;

        const updateItem = {
            email: email,
            username: username,
            itemname: itemname,
            description: item.description,
            img: item.img,
            status: "pending",
            address: address,
            price: price
        }


        fetch('http://localhost:5000/orders', {

            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateItem)
        }

        )
            .then(res => res.json())
            .then(data => {

                if (data.insertedId) {
                    alert("Order confirm")
                }
            })
            .catch((err) => {
                console.log(err.message);
            })


    }

    return (
        <div className=" d-flex flex-row row  ">
            <div className=" m-5 mx-auto col-lg-6 ">
                <div className="m-5">
                    <img className="w-60" src={item.img} alt="" />
                    <h3 className="font-bold text-red-500">{item.itemname}</h3>
                    <h4 className="font-bold">Price: ৳ {item.price}</h4>
                    <p className="w-75 text-justify">{item.description}</p>

                </div>
            </div>

            <div className="text-center col-lg-6">
                {/* <Link to={`/cartorder/${id}`}>
                    <button className="btn btn-primary">Place Order</button>
                </Link> */}
                <Form onSubmit={handleOrders} className="m-28 w-50 mx-auto">
                    <Form.Group className="mb-3" as={Col} controlId="formGridEmail">
                        <Form.Control ref={emailRef} defaultValue={user?.email} type="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} controlId="formGridPassword">
                        <Form.Control ref={usernameRef} defaultValue={user?.displayName} type="text" placeholder="Name" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Control ref={nameRef} defaultValue={item.itemname} type="text" placeholder="Food Name" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Control ref={priceRef} defaultValue={item.price} type="number" placeholder="Price" required />
                    </Form.Group>

                    <Row
                        className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <textarea ref={addressRef} className="form-control" placeholder="Address" required />
                        </Form.Group>
                    </Row>

                    <Button className="btn btn-primary" variant="primary" type="submit">
                        Place Order
                    </Button>
                </Form>



            </div>

        </div>
    );
};

export default FoodDetails;
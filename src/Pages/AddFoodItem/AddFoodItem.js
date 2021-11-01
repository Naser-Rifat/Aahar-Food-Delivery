import Button from '@restart/ui/esm/Button';
import React, { useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const AddFoodItem = () => {

    const { user } = useAuth();
    const [item, setItem] = useState({});

    const emailRef = useRef();
    const userNameRef = useRef();
    const foodNameRef = useRef();
    const foodDescriptionRef = useRef();
    const imgUrlRef = useRef();


    const handleForm = (e) => {

        const email = emailRef.current.value;
        const username = userNameRef.current.value;
        const itemname = foodNameRef.current.value;
        const description = foodDescriptionRef.current.value;
        const img = imgUrlRef.current.value;
        const addItems = { email, username, itemname, description, img };
        setItem(addItems)
        console.log(addItems);

        fetch('http://localhost:5000/items', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(item)

        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('successfully')
                    e.target.reset();

                }
            })
        e.preventDefault()


    }
    return (
        <><Form onSubmit={handleForm} className="m-28 w-50 mx-auto">
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className="font-bold">Admin Email</Form.Label>
                    <Form.Control ref={emailRef} defaultValue={user?.email} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label className="font-bold">Admin Username</Form.Label>
                    <Form.Control ref={userNameRef} defaultValue={user?.displayName} type="text" placeholder="Name" required />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label className="font-bold">Food Item Name</Form.Label>
                <Form.Control ref={foodNameRef} type="text" placeholder="Food Name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label className="font-bold">Food Sort Description</Form.Label>
                <textarea ref={foodDescriptionRef} className="form-control" placeholder="description" required />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label className="font-bold">Food Image</Form.Label>
                    <Form.Control ref={imgUrlRef} type="url" placeholder="Img Url" required />
                </Form.Group>
            </Row>

            <Button className="btn btn-primary" variant="primary" type="submit">
                Submit
            </Button>
        </Form>

        </>
    );
};

export default AddFoodItem;
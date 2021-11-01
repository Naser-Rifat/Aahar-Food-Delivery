import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const ProcessOfService = () => {
    const { setIsloading } = useAuth();
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/getservice')
            .then(res => res.json())
            .then(data => setItems(data))
            .finally(() => setIsloading(false))


    }, [])
    return (
        <>
            <div className="container mt-32">
                <p>The process of our service </p>
                <h1 className="fs-1">How it work </h1>
            </div>
            <div id="fooditems" className="m-5 row g-4 ">
                {
                    items.map(item =>
                        <Card className="col-lg-3 p-2 mx-5 mx-auto border-0 float-start">
                            <div className="d-flex justify-items-end items-end">
                                <Card.Img className=" w-25" variant="top" src={item.img} />
                                <Card.Title className="mx-2 mb-0">{item.title}</Card.Title>
                            </div>
                            <Card.Body className="px-0">

                                <Card.Text className="text-justify px-0 mb-1">
                                    {item.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    )
                }
            </div>


        </>
    )
}

export default ProcessOfService;
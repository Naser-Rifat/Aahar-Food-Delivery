import Button from '@restart/ui/esm/Button';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Fooditems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://macabre-skull-17452.herokuapp.com/items')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])


    return (
        <>
            <h1>data from server</h1>
            <div id="fooditems" className="m-5">
                {
                    items.map(item => <div className="row m-5 w-75">
                        <Card className="d-flex flex-row p-2 ">
                            <Card.Img className="w-50" variant="top" src={item.img} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text className="text-start mb-5">
                                    {item.description}
                                </Card.Text>
                                <Link to={`/fooddetails/${item._id}`}>
                                    <Button className="mt-5" variant="primary">Go somewhere</Button>
                                </Link>
                            </Card.Body>
                        </Card>

                    </div>)
                }
            </div>

        </>
    );
};

export default Fooditems;
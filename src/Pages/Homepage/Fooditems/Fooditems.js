import Button from '@restart/ui/esm/Button';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Fooditems = () => {
    const { setIsloading } = useAuth();
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://macabre-skull-17452.herokuapp.com/items')
            .then(res => res.json())
            .then(data => setItems(data))
            .finally(() => setIsloading(false))


    }, [])


    return (
        <>

            <div id="fooditems" className="m-5 row g-4 ">
                {
                    items.map(item =>
                        <Card className="col-lg-3 p-2  h-90 hover:shadow-lg mx-5  border-1">
                            <Card.Img className=" h-40 mx-auto" variant="top" src={item.img} />
                            <Card.Body>
                                <Card.Title>{item.itemname}</Card.Title>
                                <Card.Text className="text-start mb-1">
                                    {item.description}
                                </Card.Text>
                                <Link to={`/fooddetails/${item._id}`}>
                                    <Button className="mt-3 btn btn-primary " variant="primary">Order Now</Button>
                                </Link>
                            </Card.Body>
                        </Card>

                    )
                }
            </div>

        </>
    );
};

export default Fooditems;
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const FoodBlog = () => {
    const { setIsloading } = useAuth();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('https://macabre-skull-17452.herokuapp.com/foodblogs')
            .then(res => res.json())
            .then(data => setBlogs(data))
            .finally(() => setIsloading(false))


    }, [])

    return (
        <>
            <h2 className="font-extrabold text-red-500 text-center mt-20"> Food blogs</h2>
            <div id="blogs" className="m-5 row g-4 mx-auto">
                {
                    blogs.map(blog =>
                        <Card className="col-lg-5 p-2  hover:shadow-lg mx-5  border-1">
                            <Card.Img className="  mx-auto" variant="top" src={blog.img} />
                            <Card.Body>
                                <Card.Title>{blog.title}</Card.Title>
                                <Card.Text className="text-justify mb-1">
                                    {blog.description.slice(0, 250)}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    )
                }
            </div>
        </>
    );
};

export default FoodBlog;
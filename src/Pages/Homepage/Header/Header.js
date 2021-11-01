import Button from '@restart/ui/esm/Button';
import React from 'react';
import { Nav, Navbar, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import useAuth from '../../../hooks/useAuth';

const Header = () => {
    const { user, logOut } = useAuth();
    return (
        <>
            <Navbar className="px-3" collapseOnSelect expand="lg" sticky="top" bg="light" variant="light">

                <Navbar.Brand href="#home"><h2 className="w-100 font-bolder text-red-600 font-weight-900" alt="logo">Aahar</h2> </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link as={HashLink} className="disabled:opacity-50 text-dark font-bold hover:bg-blue-200 mx-1 rounded" to="/home#home">Home</Nav.Link>
                    <Nav.Link as={HashLink} className="disabled:opacity-50 text-dark font-bold hover:bg-blue-200 mx-1 rounded" to="/home#fooditems">Food Items</Nav.Link>

                    <Nav.Link as={HashLink} className="disabled:opacity-50 text-dark font-bold hover:bg-blue-200 mx-1 rounded" to="/home#blogs">Blogs</Nav.Link>
                    {
                        user?.email && <Nav.Link as={Link} className="disabled:opacity-50 text-dark font-bold hover:bg-blue-200 mx-1 rounded" to="/orders">My Orders</Nav.Link>
                    }
                    {
                        user?.email && <Nav.Link as={Link} className="disabled:opacity-50 text-dark font-bold hover:bg-blue-200 mx-1 rounded" to="/addfooditem">Add Food Item</Nav.Link>
                    }
                    {
                        user?.email && <Nav.Link as={Link} className="disabled:opacity-50 text-dark font-bold hover:bg-blue-200 mx-1 rounded" to="/manageallorders">Manage All Orders</Nav.Link>
                    }
                    {
                        user?.email ? <Button onClick={logOut} className="btn btn-warning border mr-2">Logout</Button> :
                            <Nav.Link as={HashLink} className="disabled:opacity-50 text-dark font-bold hover:bg-blue-200 mx-1 rounded" to="/login">Login</Nav.Link>
                    }


                    <Navbar.Text>
                        User: <Link className="no-underline text-danger" to="/login">{user?.displayName && user.displayName}</Link>
                    </Navbar.Text>
                    <Navbar.Brand className="mx-2"><img className="w-12 mx-auto rounded-circle" src={user?.photoURL} alt="" /> </Navbar.Brand>

                </Navbar.Collapse>


            </Navbar>

        </>
    );
};

export default Header;
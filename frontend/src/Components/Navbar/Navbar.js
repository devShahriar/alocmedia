import React from 'react'
import {Navbar ,Nav ,Form,Button,FormControl} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
const Navbarhome = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signin">Sign in</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </>
                )
}

export default Navbarhome
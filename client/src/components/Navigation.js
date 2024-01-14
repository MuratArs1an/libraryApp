import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSearch } from './SearchContext';
import { useState } from 'react';

function Navigation() {
    
    const { searchQuery, setSearchQuery } = useSearch();
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" fixed="top" style={{ marginBottom:"50px" }}>
            <Container fluid>
                <Navbar.Brand href="#">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">About</Nav.Link>
                        <Nav.Link href="#action2">Contact</Nav.Link>
                    </Nav>
                    <Form className="d-flex me-auto" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav
                        className="ml-auto"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Button variant="outline-warning" href="#action1">Sign In</Button>
                        <Button variant="outline-light" href="#action2">Sign Up</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
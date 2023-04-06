import '../css/App.css'
import React, {useState} from "react"
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import {Navbar, Container, Nav, Button} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import Login from './Login'
import Home from './Home'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar collapseOnSelect expand='md' bg="dark" variant="dark">
          <Container fluid>
            <LinkContainer to='/'>
              <Navbar.Brand>Tutor Site</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to='/'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login'>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
            <Route element={<Home />} path="/" exact />
            <Route element={<Login />} path="/login" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

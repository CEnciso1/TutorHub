import '../css/App.css'
import React, {useState} from "react"
import {BrowserRouter, Route, Routes, } from "react-router-dom"
import {Navbar, Container, Nav, Button, } from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import Login from './Login'
import Home from './Home'
import SignUp from './Signup'
import Logout from './Logout'

function App() {

  return (
    <div>
      <BrowserRouter>
          <Navbar collapseOnSelect expand='md' >
            <Container fluid>
              <LinkContainer to='/'>
                <Navbar.Brand>TutorHub</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle />
              <Navbar.Collapse>
                <Nav>
                    <LinkContainer to='/feed'>
                      <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                  <LinkContainer to='/'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/signup'>
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Container>
            <Logout/>
          </Navbar>
            <Routes>
                <Route element={<Home />} path="/feed" exact />
                <Route element={<Login />} path="/" exact/>
                <Route element={<SignUp />} path="/signup" />
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

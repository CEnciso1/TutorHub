import '../css/App.css'
import React from "react"
import {BrowserRouter, Route, Routes, } from "react-router-dom"
import {Navbar, Container, Nav } from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import Login from './Login'
import StudentFeed from './StudentFeed'
import TutorFeed from './TutorFeed'
import SignUp from './Signup'
import Logout from './Logout'
import PrivateRoute from './PrivateRoute'
import ProtectStudentRoute from './ProtectStudentRoute'
import ProtectTutorRoute from './ProtectTutorRoute'

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
                    {/* <LinkContainer to='/tutorfeed'>
                      <Nav.Link>Tutor Feed</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/studentfeed'>
                      <Nav.Link>Student Feed</Nav.Link>
                    </LinkContainer> */}
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
                {/* <Route element={<PrivateRoute/>}>
                  <Route element={<ProtectStudentRoute/>}>
                    <Route element={<StudentFeed />} path="/studentfeed" />
                  </Route>
                  <Route element={<ProtectTutorRoute/>}>
                    <Route element={<TutorFeed />} path="/tutorfeed" />
                  </Route>
                </Route> */}
                <Route element={<StudentFeed />} path="/studentfeed" />
                <Route element={<TutorFeed />} path="/tutorfeed" />
                <Route element={<Login />} path="/" exact/>
                <Route element={<SignUp />} path="/signup" />
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

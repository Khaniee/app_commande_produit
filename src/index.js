import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PageCommande from './components/PageCommande';
import Users from './components/Users';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import swDev, {} from './swDev'
import Login from './components/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/login' Component={Login}></Route>   
      </Routes>
      <Navbar bg="secondary" data-bs-theme="dark">
        <Container>
          {/* <Navbar.Brand href="#home"></Navbar.Brand> */}
          <Nav className="me-auto">
            <Link to = "/" className="nav-link">Produits</Link>
            <Link to = "/users" className="nav-link">Users</Link>
          </Nav>
        </Container>
        <Navbar.Collapse className="justify-content-end ">
          <Link to = "/login" className="nav-link">
            <Button variant="light">
              Login
            </Button>
          </Link>
          <div style={{width : "3rem"}}></div>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path='/users' Component={Users}></Route>   
        <Route path='/' Component={PageCommande}></Route>   
      </Routes>
    </Router>
  </React.StrictMode>
);
swDev();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

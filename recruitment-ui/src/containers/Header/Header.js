import React from 'react'
import logo from './pearl-island-logo.jpg'
import './Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Header() {
    
    //const nav = useNavigate();

    // const clientPage = () => {
    //     nav('/client')
    // }
    // const candidatePage = () => {
    //     nav('/candidate')
    // }
    // const homePage = () => {
    //     nav('/home')
    // }
    return (


        <Navbar collapseOnSelect expand="lg"  variant="dark" className="nav-bar">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="130"
                        height="70"
                        className="d-inline-block align-top pe-none"
                        
                        alt="Pearl Island Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <NavDropdown title="Assets" id="collasible-nav-dropdown" renderMenuOnMount={true}>
                            <NavDropdown.Item href="/candidate">Candidates</NavDropdown.Item>
                            <NavDropdown.Item href="/client">Client</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Recruitments" id="collasible-nav-dropdown" renderMenuOnMount={true}>
                            <NavDropdown.Item href="/recruitment">Recruitment</NavDropdown.Item>
                            <NavDropdown.Item href="/agreement">Agreement</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>




        // <Navbar bg="light" expand="lg">
        //     <Container fluid>
        //         <Navbar.Brand href="#">
        //             <img
        //                 src={logo}
        //                 width="130"
        //                 height="70"
        //                 className="d-inline-block align-top"
        //                 alt="React Bootstrap logo"
        //             />
        //         </Navbar.Brand>
        //         <Navbar.Toggle aria-controls="navbarScroll" />
        //         <Navbar.Collapse id="navbarScroll">
        //             <Nav
        //                 className="me-2"
        //                 // style={{ maxHeight: '70px' }}
        //                 // navbarScroll
        //             >
        //                 <NavDropdown title="Assets" id="navbarScrollingDropdown">
        //                     <NavDropdown.Item href="#action3">Candidates</NavDropdown.Item>
        //                     <NavDropdown.Item href="#action4">Client</NavDropdown.Item>
        //                     <NavDropdown.Divider />
        //                 </NavDropdown>
        //             </Nav>

        //             <Nav
        //                 className="me-2"
        //                 // style={{ maxHeight: '70px' }}
        //                 // navbarScroll
        //             >
        //                 <NavDropdown title="Recruitment" id="navbarScrollingDropdown">
        //                     <NavDropdown.Item href="#action3">Recruitment</NavDropdown.Item>
        //                     <NavDropdown.Item href="#action4">Client</NavDropdown.Item>
        //                     <NavDropdown.Divider />
        //                 </NavDropdown>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>

    )
}

export default Header

    // <div>
    //     <div className="header">
    //         <div className="left-header">
    //             <img src={logo} onClick={homePage}></img>
    //         </div>
    //         <div className="right-header">
    //             <div className ="dropdown">
    //                 <button className="btn">ASSETS</button>
    //                 <div className="dropdown-content">
    //                     <li onClick={clientPage}>Client</li>
    //                     <li onClick={candidatePage}>Candidates </li>
    //                 </div>
    //             </div>
    //             <div className="dropdown">
    //                 <button className="btn">RECRUITMENTS</button>
    //                 <div className="dropdown-content">
    //                     <li >Recruitment</li>
    //                     <li >Agreement </li>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>

    // </div>
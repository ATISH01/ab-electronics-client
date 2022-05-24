import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebse.init';
import ActiveLink from '../ActiveLink';
import logo from '../../../Assets/logo (2).png'

import './Header.css'

const Header = () => {
    const [user] = useAuthState(auth);
    const [navBar, setNavbar] = useState(false);
    const changeBackGround = () => {
        if (window.scrollY >= 30) {
            setNavbar(true)
        }
        else {
            setNavbar(false)
        }
    }
    window.addEventListener('scroll', changeBackGround)
    return (
        <>
            <Navbar collapseOnSelect sticky='top' expand="lg" variant="dark"
                className={navBar ? 'navbar colored' : 'navbar shadow-sm'}>
                <Container>
                    <Navbar.Brand className='text-white fw-bold d-flex align-items-center' as={Link} to="/">
                        <img className='me-2' height={30} src={logo} alt="" />
                        <h4>AB Electronics</h4>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav>
                                <ActiveLink className='hover-underline-animation' as={Link} to="/"> Home</ActiveLink>
                                
                                {user ?
                                    <Nav.Link className='text-white hover-underline-animation' onClick={() => signOut(auth)} as={Link} to="/">SingOut</Nav.Link>
                                    :
                                    <ActiveLink className='hover-underline-animation' as={Link} to="/login">Login</ActiveLink>
                                }
                                {
                                    user && <ActiveLink className=' hover-underline-animation' as={Link} to="/manageitems">ManageItems</ActiveLink>

                                }
                                {
                                    user && <ActiveLink className=' hover-underline-animation' as={Link} to="/myitem">MyItems</ActiveLink>
                                }
                                <Nav.Link className='text-white' > <strong>{user?.displayName}</strong></Nav.Link>
                                <ActiveLink className='hover-underline-animation' as={Link} to='/blogs'>Blogs</ActiveLink>
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
};

export default Header;
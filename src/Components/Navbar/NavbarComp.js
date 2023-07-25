import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../App.css'
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { images_url } from '../../assests/DataBase';
import './NavBar.css'
import { useContext } from 'react';
import ContextProvider from '../../assests/Contextprovider';
import ThemeChanger from '../Others/ThemeChanger';
const NavbarComp = () => {

    const [navbarExpand, setNavbarExpand] = useState(false)
    const [navVariant, setNavVariant] = useState('light')

    useEffect(() => {
        localStorage.getItem('theme') == 'dark' && setNavVariant('dark')
    })
    
    const closeNavbar = () => setNavbarExpand(false)
    const toggleNavbar = () => setNavbarExpand(!navbarExpand)
    const {indconlogo,setIndconlogo} = useContext(ContextProvider)
    function themechange(){
        document.querySelector('html').classList.toggle('dark-theme')
        localStorage.getItem('theme') == 'dark' ? localStorage.setItem('theme','light') : localStorage.setItem('theme','dark')
        localStorage.getItem('theme') == 'dark' ? setIndconlogo(images_url+'navbar images/indcon logo dark.png') : setIndconlogo(images_url+'navbar images/indcon logo.png')
        setNavVariant(localStorage.getItem('theme'))
        closeNavbar()
    }
    return (
        <div>
            <Navbar onToggle={toggleNavbar} expanded={navbarExpand} variant={navVariant} style={{ backgroundColor: 'var(--brand-light-col)' }} sticky={'top'} expand="lg">
                <Container style={{maxWidth:'100%',paddingLeft:'0'}}>
                    <Navbar.Brand className='ps-4'>
                        <NavLink className='nav-link nav-logo' to={'/'}>
                            {[images_url + 'navbar images/Anna_University_Logo.png',indconlogo , images_url + 'navbar images/sielogo.png'].map(item => (
                                <img key={item}
                                    width="70"
                                    height="70"
                                    src={item}
                                    className="d-inline-block align-top me-2"
                                    alt="React Bootstrap logo"
                                />
                            ))}
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <div style={{position:'relative',flexBasis:'100%',paddingRight:'20px'}}>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto ps-4">
                            <NavLink onClick={closeNavbar} className='nav-link' to={'/'}>Home</NavLink>
                            <NavLink onClick={closeNavbar} className='nav-link' to={'/about'}>About</NavLink>
                            <NavLink onClick={closeNavbar} className='nav-link' to={'/events'}>Events</NavLink>
                            <NavLink onClick={closeNavbar} className='nav-link' to={'/team'}>Team</NavLink>
                            <NavLink onClick={closeNavbar} className='nav-link' to={'/gallery'}>Gallery</NavLink>
                            <Link onClick={closeNavbar} className='nav-link' to='ContactScroll' smooth={true} duration={500} >Contact</Link>
                            <Link className='nav-link themechanger' to="#" smooth={true} duration={500} ><ThemeChanger listener={themechange} /></Link>
                        </Nav>
                    </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComp
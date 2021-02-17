import React from 'react';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

import Typeahead from '../Typeahead/Typeahead';
import logo from '../../resources/images/tmdb_logo.svg.png'
import './Navbar.css';

const Navbar = () => {

    return(
        <Nav className='navbar sticky-top'>
            <Link to='/'>
                <img src={logo} alt='TMDB'></img>
            </Link>
            <Typeahead></Typeahead>
        </Nav>
    );
}

Navbar.defaultProps = {
    title: 'movieDB',
};

export default Navbar;
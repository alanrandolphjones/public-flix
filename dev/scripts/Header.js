import React from 'react';

const Header = (props) => {
    
    return (
        <header>
            <nav className="nav">
                <h1 className="header-1">Public Flix</h1>
                <ul className="nav__ul">
                    <li className="nav__li"><a href="#">Home</a></li>
                    <li className="nav__li"><a href="#">Science Fiction and Horror</a></li>
                    <li className="nav__li"><a href="#">Film Noir</a></li>
                    <li className="nav__li"><a href="#">Comedy</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;

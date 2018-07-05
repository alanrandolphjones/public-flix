import React from 'react';

const Carousel = (props) => {
    
    return (
        <li className="collectionSection__film">
            <h3 className="collectionSection__header-3 header-3">{props.title}</h3>
            <img className="collectionSection__img" src={`https://archive.org/services/img/${props.identifier}`} />
            <p className="paragraph collectionSection__graf">{props.shortDescription}</p>
            <a className="collectionSection__watch button" href="#" onClick={() => props.loadMovie(props)}>Watch Now!</a>
        </li>
    )
}

export default Carousel;
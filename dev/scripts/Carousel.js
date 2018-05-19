import React from 'react';

const Carousel = (props) => {
    
    return (
        <li>
            <h3>{props.title}</h3>
            <img src={`https://archive.org/services/img/${props.identifier}`} />
            <p>{props.shortDescription}</p>

            <a href="#" onClick={() => props.loadMovie(props)}>Watch Now!</a>
        </li>
    )
}

export default Carousel;
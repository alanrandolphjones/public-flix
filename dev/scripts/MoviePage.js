import React from 'react';

const MoviePage = (props) => {

    return  props.moviePageHidden ? null : (
            <section>
                <iframe src={`https://archive.org/embed/${props.movie.identifier}`} width="640" height="480" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
            <h2>{props.movie.title}</h2>
            <p>Description: {props.movie.description}</p>
            <a href="#" onClick={()=> props.goHome()}>Go Back</a>
            </section>
            )
}

export default MoviePage;
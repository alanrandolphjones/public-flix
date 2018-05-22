import React from 'react';

const MoviePage = (props) => {    

    return  props.moviePageHidden ? null : (
            <section className="moviePage">
                <iframe className="moviePage__iframe" src={`https://archive.org/embed/${props.movie.identifier}`} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                <div className="moviePage__container">
                    <h2>{props.movie.title}</h2>
                    <p>Description: {props.movie.description}</p>
                    <a className="button" href="#" onClick={()=> props.goHome()}>Go Back</a>
                </div>
            </section>
            )
}

export default MoviePage;
import React from 'react';

const FeaturedMovie = (props) => {
    return props.mainPageHidden ? null : (
        <section>
            <h2>Movie Title</h2>
            <h4><a href="#">Watch Movie</a></h4>
            <p>Description: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem obcaecati eaque sequi possimus. Perferendis, soluta, quos vel ducimus, rem perspiciatis ipsam corrupti veritatis doloribus quo aspernatur. Omnis nihil maxime qui.</p>
            <img src="http://unsplash.it/500/500" alt=""/>
        </section>
    )
}

export default FeaturedMovie;
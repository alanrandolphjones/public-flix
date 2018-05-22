import React from 'react';
import axios from 'axios';

class FeaturedMovie extends React.Component {
    constructor() {
        super()

        this.state = {
            featuredMovie: {
                title: '',
                identifier: '',
                id: 0,
                movieDBData: {}
            }
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            featuredMovie: this.props.canon[this.props.randomNumberGenerator(this.props.canon.length)]
        })
    }

    componentDidMount() {

        const movieDBCall = () => {
            axios.get('https://api.themoviedb.org/3/movie/' + this.state.featuredMovie.id, 
                {
                    params: {
                        api_key: this.props.movieDBKey,
                        language: 'en-US'
                        }
                    }).then((res) => {
                        
                        const featuredMovie = {
                            title: res.data.title,
                            identifier: this.state.featuredMovie.identifier,
                            id: this.state.featuredMovie.identifier,
                            posterURL: 'https://image.tmdb.org/t/p/original/' + res.data.poster_path,
                            description: res.data.overview,
                            year: res.data.release_date.substring(0,4)
                        }

                        // Unfortunately, the movie DB overview for Within Our Gates uses the word "negro" twice, which is awkward to put on the front page! But: Oscar Micheaux is a landmark Black filmmaker while white, male filmmakers are already overrepresented here, so I don't want to remove it from the 'canon' array.

                        featuredMovie.description = featuredMovie.description.replace(/negro/g, "Black")


                        document.body.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${res.data.backdrop_path}')`                        

                        this.setState({
                            featuredMovie: featuredMovie
                        })
                        
                    })
            }

        movieDBCall()
        
    }

    render() {        
        return this.props.mainPageHidden ? null : (
            <section className="FeaturedMovie">
                <div className="FeaturedMovie__container">
                    <h2 className="header-2">{`${this.state.featuredMovie.title} (${this.state.featuredMovie.year})`}</h2>
                    <a className="button FeaturedMovie__button" href="#" onClick={() => this.props.loadMovie(this.state.featuredMovie)}>Watch Now!</a>
                    <p className="paragraph">{this.state.featuredMovie.description}</p>
                </div>
                <img className="FeaturedMovie__poster" src={this.state.featuredMovie.posterURL} alt=""/>
            </section>
        )
    }
}

export default FeaturedMovie;
import React from 'react';
import axios from 'axios';
import FeaturedMovie from './FeaturedMovie';
import Carousel from './Carousel';
import MoviePage from './MoviePage';
import CollectionPage from './CollectionPage'

class MainSection extends React.Component {
    constructor() {
        super()

        this.state = {
            collections: {
                sciFiHorror: {
                    fiveFilmArray: [],
                    fullMovieArray: []
                },
                filmNoir: {
                    fiveFilmArray: [],
                    fullMovieArray: []
                },
                comedy: {
                    fiveFilmArray: [],
                    fullMovieArray: []
                },
            },
            mainPageHidden: false,
            moviePageHidden: true,
            collectionPageHidden: true,
            selectedMovie: [],
            currentCollection: '',
            loadNumber: 20
        }
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.loadMovie = this.loadMovie.bind(this);
        this.goHome = this.goHome.bind(this)
        this.loadCollectionPage = this.loadCollectionPage.bind(this)
    }

    randomNumberGenerator(number) {
        return Math.floor(Math.random() * number)
    }

    componentDidMount() {        

        const collections = {}

        const getMovies = (collection) => {      
    
            axios.get('https://cryptic-headland-94862.herokuapp.com/https://archive.org/advancedsearch.php',
                {
                    params: {
                        q: `collection:${collection.name}`,
                        output: 'json',
                        rows: collection.number
                    }
                })
                .then((data) => {                            
                
                    const ZIPAndMovieArray = data.data.response.docs;
                    
                    const fullMovieArray = ZIPAndMovieArray.filter((film)=>{
                        return film.mediatype === "movies"
                    })
                
                    const fiveFilmArray = [];

                    fullMovieArray.forEach((movie) => {

                        if (!movie.description) {
                            movie.description = "There is no description for this film."
                        }
                        else if (Array.isArray(movie.description) === true && movie.description[0].split(" ").length > 20) {
                            movie.shortDescription = movie.description[0].split(" ").splice(0, 20).join(" ") + '...'
                            movie.description = movie.description[0]
                        }
                        else if (Array.isArray(movie.description) === true && movie.description[0].split(" ").length < 20) {
                            movie.shortDescription = movie.description[0]
                            movie.description = movie.description[0]
                        }
                        else if (Array.isArray(movie.description) === false && movie.description.split(" ").length > 20) {
                            movie.shortDescription = movie.description.split(" ").splice(0, 20).join(" ") + '...'
                        }
                        else {
                            movie.shortDescription = movie.description;
                        }
                        if (Array.isArray(movie.title) === true) {
                            movie.title = movie.title[0]
                        }

                    })

                    for (let i = 0; i < 5; i++) {
                        fiveFilmArray.push(fullMovieArray[this.randomNumberGenerator(fullMovieArray.length)])
                    }

                    collections[collection.stateString] = {
                        fiveFilmArray: fiveFilmArray,
                        fullMovieArray: fullMovieArray
                    }

                    this.setState({
                        collections: collections
                    })  
                                
                })
            
        }

        for (const collection in this.props.collections) {      
            getMovies(this.props.collections[collection])
        }        
    
    }

    loadMovie(props) {        
        
        this.setState({
            mainPageHidden: true,
            moviePageHidden: false,
            collectionPageHidden: true,
            selectedMovie: props,
        })
    }

    goHome() {
        this.setState({
            mainPageHidden: false,
            moviePageHidden: true,
            collectionPageHidden: true,
        })
    }

    loadCollectionPage(collection) {

        //In here, figure out how to load 20 entries from each collection, with an option to view more at the bottom.        
        this.setState({
            mainPageHidden: true,
            collectionPageHidden: false,
            moviePageHidden: true,
            currentCollection: collection
        })
        
    }

    render () {

        const collectionsArray = []

        for (let collection in this.state.collections) {
            collectionsArray.push(collection)
        }

        return (
            
            <main>
                <MoviePage
                    moviePageHidden={this.state.moviePageHidden}
                    movie={this.state.selectedMovie}
                    goHome={this.goHome}
                />
                <CollectionPage
                    collectionPageHidden={this.state.collectionPageHidden}
                    collections={this.state.collections}
                    currentCollection={this.state.currentCollection}
                    loadMovie={this.loadMovie}
                    collectionProps={this.props.collections}
                    loadMore={this.loadMore}
                    loadNumber={this.state.loadNumber}
                />
                <FeaturedMovie
                    mainPageHidden={this.state.mainPageHidden}
                    canon={this.props.canon}
                    randomNumberGenerator={this.randomNumberGenerator}
                    loadMovie={this.loadMovie}
                    movieDBKey={this.props.movieDBKey}
                />

                {collectionsArray.map((collection, i) => {                    
                                        
                    return this.state.mainPageHidden ? null : (
                        <section key={i} className="collectionSection">
                            <h2>{this.props.collections[collection].title}</h2>
                            {/* How do we return this carousel for each key in this.state.collections */}
                            <div className="collectionSection__container">
                                {this.state.collections[collection].fiveFilmArray.map((movie, i) => {
                                    
                                    return (<Carousel
                                        key={i}
                                        title={movie.title}
                                        identifier={movie.identifier}
                                        shortDescription={movie.shortDescription}
                                        description={movie.description}
                                        loadMovie={this.loadMovie}
                                        />
                                    )
                                })}
                            </div>
                            <a href="#" onClick={() => this.loadCollectionPage(this.props.collections[collection].stateString)}>See More</a>
                        </section>
                    )
                })}
            </main>
        )
    }

}

export default MainSection

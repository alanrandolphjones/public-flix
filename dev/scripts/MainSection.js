import React from 'react';
import axios from 'axios';
import FeaturedMovie from './FeaturedMovie';
import Carousel from './Carousel';
import MoviePage from './MoviePage';
import CollectionPage from './CollectionPage'

class MainSection extends React.Component {

    render () {
        
        const collectionsArray = []

        for (let collection in this.props.stateCollections) {
            collectionsArray.push(collection)
        }

        if (!this.props.moviesLoaded) return (
            <h3 class="header-3">Loading with all the power of a massive, not-for-profit, public online archive! <i className="fa fa-spinner fa-spin"></i></h3>
        )

        return (
            
            <main>
                <MoviePage
                    moviePageHidden={this.props.moviePageHidden}
                    movie={this.props.selectedMovie}
                    goHome={this.props.goHome}
                />
                <CollectionPage
                    collectionPageHidden={this.props.collectionPageHidden}
                    stateCollections={this.props.stateCollections}
                    currentCollection={this.props.currentCollection}
                    loadMovie={this.props.loadMovie}
                    collectionProps={this.props.collections}
                    loadMore={this.props.loadMore}
                    // loadNumber={this.props.loadNumber}
                />

                <FeaturedMovie
                    mainPageHidden={this.props.mainPageHidden}
                    canon={this.props.canon}
                    randomNumberGenerator={this.props.randomNumberGenerator}
                    loadMovie={this.props.loadMovie}
                    movieDBKey={this.props.movieDBKey}
                />

                {collectionsArray.map((collection, i) => {                    
                                        
                    return this.props.mainPageHidden ? null : (
                        <section key={i} className="collectionSection">
                            <h2 className="header-2 header-2--sectionHeader">{this.props.collections[collection].title}</h2>
                            <ul className="collectionSection__container">
                                
                                {this.props.stateCollections[collection].fourFilmArray.map((movie, i) => {
                                    
                                    return (<Carousel
                                        key={i}
                                        title={movie.title}
                                        identifier={movie.identifier}
                                        shortDescription={movie.shortDescription}
                                        description={movie.description}
                                        loadMovie={this.props.loadMovie}
                                        />
                                    )
                                })}
                                <li><a className="button collectionSection__seeMore" href="#" onClick={() => this.props.loadCollectionPage(this.props.collections[collection].stateString)}>See More...</a></li>
                            </ul>
                        </section>
                    )
                })}
            
            </main>
        )
    }

}

export default MainSection

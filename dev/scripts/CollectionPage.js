import React from 'react';
import Carousel from './Carousel'

class CollectionPage extends React.Component {
    constructor() {
        super()

        this.state = {
            loadNumber: 20,
            seeMoreHidden: false
        }
    }

    loadMore(collection) {        

        this.setState({
            loadNumber: this.state.loadNumber + 20
        })

        if (this.state.loadNumber > collection.fullMovieArray.length) {
            this.setState({
                seeMoreHidden: true
            })
        }

    }
    
    render() {
        
        const collection = this.props.stateCollections[this.props.currentCollection]
                        
        return this.props.collectionPageHidden ? null : (
            <div className="collectionSection">
                <h2 className="header-2 header-2--sectionHeader">{this.props.collectionProps[this.props.currentCollection].title}</h2>
                <div className="collectionSection__container">
                    {collection.fullMovieArray.slice(0, this.state.loadNumber)
                    .map((movie, i) => {                    
                        return (
                            <Carousel
                                key={i}
                                title={movie.title}
                                identifier={movie.identifier}
                                shortDescription={movie.shortDescription}
                                description={movie.description}
                                loadMovie={this.props.loadMovie}
                            />
                        )
                    })}
                </div>
                <a href="#"
                onClick={() => this.loadMore(collection)} 
                    className={this.state.seeMoreHidden ? "hidden" : "button collectionSection__seeMore" }>See More...</a>
            </div>
        )
    
    }

}

export default CollectionPage;

// 
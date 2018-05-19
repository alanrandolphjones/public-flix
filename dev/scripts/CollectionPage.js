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
    // console.log(props.loadNumber);

    loadMore(collection) {        

        this.setState({
            loadNumber: this.state.loadNumber + 20
        })

        if (this.state.loadNumber > collection.fullMovieArray.length) {
            this.setState({
                seeMoreHidden: true
            })
        }
        
        console.log(collection);
        
        console.log(this.state.loadNumber);

    }
    

    // if (props.collections[props.currentCollection] === undefined) {

    //     return null;
    // } else {
    render() {
        
        const collection = this.props.collections[this.props.currentCollection]
                        
        return this.props.collectionPageHidden ? null : (
            <div>
                <h2>{this.props.collectionProps[this.props.currentCollection].title}</h2>
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
                <a href="#bottom" id="bottom"
                onClick={() => this.loadMore(collection)} 
                className={this.state.seeMoreHidden ? "hidden" : null }>See More</a>
            </div>
        )
    
    }

}

export default CollectionPage;

// 
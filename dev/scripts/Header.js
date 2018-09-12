//find search library here: https://github.com/ghoshnirmalya/react-search-box

// https://www.youtube.com/watch?v=BvtQMxekmH0

import React from 'react';
import Search from 'react-search-box';
import axios from 'axios';

class Header extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: '',
            collectionsArray: [],
            allFilms: []
        }

        this.handleChange = this.handleChange.bind(this);
        // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    }

    handleChange(value) {

        console.log(value);

    }

    getGenres(collections) {
        const collectionsArray = [];

        for (let collection in collections) {
            collectionsArray.push(collection);
        };

        this.setState({
            collectionsArray: collectionsArray,
        })
    }

    componentDidMount() {
        
        this.getGenres(this.props.collections);

    }

    componentWillReceiveProps() {

        const filmArrays = this.props.filmArrays
        

        let allFilms = [];

        // console.log(this.state.collectionsArray);
        

        this.state.collectionsArray.forEach(function(collection){
            
            if (filmArrays[collection]) {
                
                allFilms = allFilms.concat(filmArrays[collection].fullMovieArray);
                            
            }
            

        })

        allFilms = allFilms.map(function(film) {
            
            film.lowerCaseTitle = film.title.toLowerCase();

            return film
        })

        this.setState({
            allFilms: allFilms
        })        
        
    }

    render() {
        
        return (
            <header>
                <nav className="nav">
                    <h1 className="header-1">Public Flix</h1>
                    <div className="nav__hamburger"><a href="#"><i className="fas fa-bars"></i></a></div>
                    <ul className="nav__ul">
                        <li className="nav__li" onClick={() => this.props.goHome()}><a href="#">Home</a></li>
                        {this.state.collectionsArray.map((collection, i)=> {
                            return (
                                <li key={i} className="nav__li nav__li--genreItem" onClick={() => this.props.loadCollectionPage(this.props.collections[collection].stateString)}><a href="#">{this.props.collections[collection].title}</a></li>
                            )
                        })}
                    </ul>
                    {/* <Search 
                        data={this.state.allFilms}
                        onChange={this.handleChange()}
                        placeholder="Search for a string..."
                        class="search-class"
                        searchKey="lowerCaseTitle"
                    /> */}
                    {/* <form action="">
                        <label> Search
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                        </label>
                    </form> */}
                </nav>
            </header>
        )
    }
}

export default Header;

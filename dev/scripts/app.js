// API endpoint: https://archive.org/advancedsearch.php?q=collection:feature_films&rows=&page=7&output=json

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FeaturedMovie from './FeaturedMovie';
import Carousel from './Carousel';
import MainSection from './MainSection'

const collections = {
  sciFiHorror: {
    title: "Science Fiction and Horror",
    stateString: 'sciFiHorror',
    name: 'SciFi_Horror',
    number: 474
  },
  filmNoir: {
    title: "Film Noir",
    stateString: 'filmNoir',
    name: 'Film_Noir',
    number: 97
  },
  comedy: {
    title: "Comedy",
    stateString: 'comedy',
    name: 'Comedy_Films',
    number: 292
  }
}

class App extends React.Component {

  render() {    
    return (
      <div>
        <header>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Search</a></li>
              <li><a href="#">Genres</a></li>
            </ul>
          </nav>
          <h1>Public Flix</h1>
        </header>

        <MainSection
          collections={this.props.collections}
        />

      </div>
    )
  }
}

ReactDOM.render(<App collections={collections} />, document.getElementById('app'));
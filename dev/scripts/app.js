//Add search function

//Add Firebase/Login Function

//Fix hover state bugs / Fix responsiveness

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MainSection from './MainSection';
import Header from './Header'

const movieDBKey = 'bd5ee0c206e79e2dc0186972054894df'

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

const canon = [
  {
    title: "The 39 Steps",
    identifier: 'The39StepsImageQualityUpgrade',
    id: 260
  },
  {
    title: 'Night of the Living Dead',
    identifier: 'Night_Of_The_Living_Dead_raw_HD_WS',
    id: 10331
  },
  {
    title: 'Detour',
    identifier: 'Detour_66',
    id: 20367
  },
  {
    title: 'His Girl Friday',
    identifier: 'HisGirlFriday1940_201505',
    id: 3085
  },
  {
    title: 'DOA',
    identifier: 'thoseguysontheradio_gmail_Doa',
    id: 18995
  },
  {
    title: 'Plan 9 From Outer Space',
    identifier: 'Plan_9_from_Outer_Space_1959',
    id: 10513
  },
  {
    title: 'House on Haunted Hill',
    identifier: 'HouseOnHauntedHillWidescreenVideoUpgrade',
    id: 15856
  },
  {
    title: 'Carnival of Souls',
    identifier: 'CarnivalOfSoulsVideoQualityUpgrade',
    id: 16093
  },
  {
    title: 'The Most Dangerous Game',
    identifier: 'TheMostDangerousGame',
    id: 1994
  },
  {
    title: 'Nosferatu',
    identifier: 'Nosferatu1922',
    id: 653
  },
  {
    title: 'The Cabinet of Dr. Caligari',
    identifier: 'TheCabinetOfDr.Caligari1920',
    id: 234
  }, 
  {
    title: 'The General',
    identifier: 'The_General_Buster_Keaton',
    id: 961
  }, 
  {
    title: 'The Stranger',
    identifier: 'TheStranger_0',
    id: 20246
  }, 
  {
    title: 'Scarlet Street',
    identifier: 'ScarletStreet1945',
    id: 17058
  }, 
  {
    title: 'The Hitch-Hiker',
    identifier: 'TheHitchHiker1953',
    id: 41462
  }, 
  {
    title: 'Steamboat Bill, Jr.',
    identifier: 'SteamboatBill1928HDMovieBusterKeaton',
    id: 25768
  }, 
  {
    title: 'The Immigrant',
    identifier: 'TheImmigrant1917',
    id: 47653
  }, 
  {
    title: "Intolerance: Love's Struggle Throughout the Ages",
    identifier: 'Intolerance',
    id: 3059
  },
  {
    title: 'Within Our Gates',
    identifier: 'WithinOurGates',
    id: 77621
  }, 
  {
    title: 'Dementia 13',
    identifier: 'Dementia13_201508',
    id: 28503
  }, 
  {
    title: 'White Zombie',
    identifier: 'WhiteZombie1932-720p',
    id: 26860
  },
]

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      moviesLoaded: false,
      collections: {
        sciFiHorror: {
          fourFilmArray: [],
          fullMovieArray: []
        },
        filmNoir: {
          fourFilmArray: [],
          fullMovieArray: []
        },
        comedy: {
          fourFilmArray: [],
          fullMovieArray: []
        },
      },
      mainPageHidden: false,
      moviePageHidden: true,
      collectionPageHidden: true,
      selectedMovie: [],
      currentCollection: '',
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.loadMovie = this.loadMovie.bind(this);
    this.goHome = this.goHome.bind(this);
    this.loadCollectionPage = this.loadCollectionPage.bind(this);
  }

  randomNumberGenerator(number) {
    return Math.floor(Math.random() * number)
  }

  loadMovie(theseProps) {

    this.setState({
      mainPageHidden: true,
      moviePageHidden: false,
      collectionPageHidden: true,
      selectedMovie: theseProps,
    })
  }

  goHome() {
    this.setState({
      mainPageHidden: false,
      moviePageHidden: true,
      collectionPageHidden: true
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

  componentDidMount() {

    const collections = {}

    const getMovies = (collection) => {      

      axios.get('https://boiling-shelf-16073.herokuapp.com/https://archive.org/advancedsearch.php',
        {
          params: {
            q: `collection:${collection.name}`,
            output: 'json',
            rows: collection.number
          }
        })
        .then((data) => {   

          const ZIPAndMovieArray = data.data.response.docs;

          const fullMovieArray = ZIPAndMovieArray.filter((film) => {
            return film.mediatype === "movies"
          })

          const fourFilmArray = [];

          fullMovieArray.forEach((movie) => {

            if (!movie.description) {
              movie.description = "There is no description for this film."
            }
            else if (Array.isArray(movie.description) === true && movie.description[0].split(" ").length > 15) {
              movie.shortDescription = movie.description[0].split(" ").splice(0, 15).join(" ") + '...'
              movie.description = movie.description[0]
            }
            else if (Array.isArray(movie.description) === true && movie.description[0].split(" ").length < 15) {
              movie.shortDescription = movie.description[0]
              movie.description = movie.description[0]
            }
            else if (Array.isArray(movie.description) === false && movie.description.split(" ").length > 15) {
              movie.shortDescription = movie.description.split(" ").splice(0, 15).join(" ") + '...'
            }
            else {
              movie.shortDescription = movie.description;
            }
            if (Array.isArray(movie.title) === true) {
              movie.title = movie.title[0]
            }

            movie.title = movie.title.replace(/\./g," ")

            movie.title = movie.title.replace(/-hd/i, " ")

            movie.title = movie.title.replace(/\(ipod\)/i, " ")

            movie.title = movie.title.replace(/ipod/i, " ")

            movie.title = movie.title.replace(/hd/i, " ")

          })

          for (let i = 0; i < 4; i++) {
            fourFilmArray.push(fullMovieArray[this.randomNumberGenerator(fullMovieArray.length)])
          }

          collections[collection.stateString] = {
            fourFilmArray: fourFilmArray,
            fullMovieArray: fullMovieArray
          }

          this.setState({
            collections: collections,
            moviesLoaded: true
          })

        })

    }

    for (const collection in this.props.collections) {
      getMovies(this.props.collections[collection])
    }

  }

  render() {    
    return (
      <div className="bg-gradient">
      <div className="wrapper">
      <Header 
        collections={this.props.collections}
        loadCollectionPage={this.loadCollectionPage}
        goHome={this.goHome}
        filmArrays={this.state.collections}
      />

        <MainSection
          stateCollections={this.state.collections}
          collections={this.props.collections}
          canon={this.props.canon}
          movieDBKey={this.props.movieDBKey}
          loadCollectionPage={this.loadCollectionPage}
          moviePageHidden={this.state.moviePageHidden}
          selectedMovie={this.state.selectedMovie}
          collectionPageHidden={this.state.collectionPageHidden}
          currentCollection={this.state.currentCollection}
          mainPageHidden={this.state.mainPageHidden}
          randomNumberGenerator={this.randomNumberGenerator}
          loadMovie={this.loadMovie}
          goHome={this.goHome}
          loadMore={this.loadMore}
          moviesLoaded={this.state.moviesLoaded}
        />
      </div>
      </div>
    )
  }
}

ReactDOM.render(<App collections={collections} 
  canon={canon} 
  movieDBKey={movieDBKey}
  />, document.getElementById('app'));
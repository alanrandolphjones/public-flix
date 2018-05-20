// API endpoint: https://archive.org/advancedsearch.php?q=collection:feature_films&rows=&page=7&output=json

// MovieDB key: bd5ee0c206e79e2dc0186972054894df

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FeaturedMovie from './FeaturedMovie';
import Carousel from './Carousel';
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

  render() {    
    return (
      <div className="bg-gradient">
      <div className="wrapper">
      <Header />

        <MainSection
          collections={this.props.collections}
          canon={this.props.canon}
          movieDBKey={this.props.movieDBKey}
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
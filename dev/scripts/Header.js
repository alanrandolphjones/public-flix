import React from 'react';

const Header = (props) => {

    const collectionsArray = []

    for (let collection in props.collections) {
        collectionsArray.push(collection)
    }

    // console.log(collectionsArray);
    // const newArray = collectionsArray.map((collection) => {
    //     props.collections[collection].title
    // })
    // console.log(newArray);
    

    return (
        <header>
            <nav className="nav">
                <h1 className="header-1">Public Flix</h1>
                <div className="nav__hamburger"><a href="#"><i className="fas fa-bars"></i></a></div>
                <ul className="nav__ul">
                    <li className="nav__li" onClick={() => props.goHome()}><a href="#">Home</a></li>
                    {collectionsArray.map((collection, i)=> {
                        return (
                            <li key={i} className="nav__li nav__li--genreItem" onClick={() => props.loadCollectionPage(props.collections[collection].stateString)}><a href="#">{props.collections[collection].title}</a></li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}

export default Header;

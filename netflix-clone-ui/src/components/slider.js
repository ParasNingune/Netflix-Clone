import React from 'react'
import CardSlider from './cardSlider';

export default function Slider({movies}) {

    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to);
    };

    return (
        <div>
            <CardSlider title="Trending Now" data={getMoviesFromRange(0,8)}/>
            <CardSlider title="New Releases" data={getMoviesFromRange(8,16)}/>
            <CardSlider title="Blockbuster Movies" data={getMoviesFromRange(16,24)}/>
            <CardSlider title="Popular on Netflix" data={getMoviesFromRange(24,32)}/>
            <CardSlider title="Action Movies" data={getMoviesFromRange(32,40)}/>
            <CardSlider title="Epics" data={getMoviesFromRange(40,48)}/>
            <CardSlider title="Drama" data={getMoviesFromRange(48,56)}/> 
        </div>
    )
}

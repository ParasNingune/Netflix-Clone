import React, { useRef, useState } from 'react'
import Card from './card'
import "../styles/cardSlider.css"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function CardSlider({data, title}) {

  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const listRef = useRef();
  
  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 3) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <div 
      className='cardSlider-container'
      onMouseEnter={() =>setShowControls(true)}
      onMouseLeave={() =>setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className='wrapper'>
        <div className={`slider-action left ${!showControls ? "none" : ""}`}>
          <AiOutlineLeft onClick={() => handleDirection("left")}/>
        </div>
        <div className='slider' ref={listRef}>
          {data.map((movie, index) => {
              return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div className={`slider-action right ${!showControls ? "none" : ""}`}>
          <AiOutlineRight onClick={() => handleDirection("right")}/>
        </div>
      </div>

      
    </div>
  )
}

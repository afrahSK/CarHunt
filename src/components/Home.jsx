import React from 'react'
import car from '../images/car.jpg'
import car2 from '../images/car2.png'
import car3 from '../images/car3.jpg'
const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home-left">
            <p className="left-txt">
              Your dream car, one click away
            </p>
            <a href="#browse" className='left-start'>Start searching now</a>
        </div>
        <div className="home-right">
            <img src={car3} alt="car" className="right-img" />
        </div>
      </div>
    </>
  )
}

export default Home
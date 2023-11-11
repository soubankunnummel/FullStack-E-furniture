import React from 'react'
import Carousel from 'react-multi-carousel';

export default function BanCorse1() {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1024 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 1024, min: 800 },
          items: 4,
        },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };
  return (
    < >

<div className="container mt-5 w-75 ban-crosel ">
        <Carousel responsive={responsive} className="">
         
          <div className="card" style={{ marginLeft: "10px" }}>
            {" "}
            {/* Added marginLeft */}
            <img
              src="https://www.ikea.com/images/office-accessories-b0adcb553d941b6db4fe076cb539f0c4.jpg?f=xs"
              className="crosel-img "
              alt=""
            />
           
          </div>
          <div className="card" style={{ marginLeft: "10px" }}>
            {" "}
            {/* Added marginLeft */}
            <img
              src="https://www.ikea.com/images/bed-textiles-a13e46258a722094b07af8d044fdcd7a.jpg?f=xs"
              className="crosel-img "
              alt=""
            />
            
          </div>
          <div className="card" style={{ marginLeft: "10px" }}>
            {" "}
            {/* Added marginLeft */}
            <img
              src="https://www.ikea.com/images/cooking-accessories-f357da8a5787d63386b8b6a990867154.jpg?f=xs"
              className="crosel-img "
              alt=""
            />
            
          </div>
          <div className="card" style={{ marginLeft: "10px" }}>
            {" "}
            {/* Added marginLeft */}
            <img
              src="https://www.ikea.com/images/food-storage-b76081f2b5d03e574c5c27ff7895f5ba.jpg?f=xs"
              className="crosel-img "
              alt=""
            />
           
          </div>
          <div className="card" style={{ marginLeft: "10px" }}>
            {" "}
            {/* Added marginLeft */}
            <img
              src="https://www.ikea.com/images/office-accessories-b0adcb553d941b6db4fe076cb539f0c4.jpg?f=xs"
              className="crosel-img "
              alt=""
            />
            
          </div>
          <div className="card" style={{ marginLeft: "10px" }}>
            {" "}
            {/* Added marginLeft */}
            <img
              src="https://www.ikea.com/images/office-accessories-b0adcb553d941b6db4fe076cb539f0c4.jpg?f=xs"
              className="crosel-img "
              alt=""
            />
          
          </div>
        </Carousel>
      </div>


    </>
  )
}

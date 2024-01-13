import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'

export default function Home() {
  // serch state is for value being serched 'onChange={(e) => { setSearch(e.target.value) }}'    item.include(serch)
  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0])
    setFoodCat(response[1])
    // console.log(response[0], response[1]);
  }

  // console.log(foodCat)
  // console.log(foodItem)

  useEffect(() => {
    loadData()
  }, [])

  //react first render the return and then above code 
  //so we are using ternary(switch and if)
  //but of no use.
  return (
    <>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" >

          <div className="carousel-inner " id='carousel'>
            {/* style object containing zIndex is because it is not visible at start as it is behind the xy plane    Clt shift L for selecting all instances*/}
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center objectFit">  {/* justify-content-center, copied this <form> from navbar for search box    
              and converted this form to div coz i dont want to bubble(preventDefult) */}
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          // This condition will always return 'true' since JavaScript compares objects by reference, not value.
          // foodCat !== [] ? 
          foodCat.map((data) => {
            return (
              <div className='row mb-3' >
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map((filterItems) => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md col-lg-3'>
                        <Card
                          // now I am sending collectively foodName and imgSrc
                          foodItems = {filterItems}
                          // foodName={filterItems.name}
                          options={filterItems.options[0]}
                        // imgSrc={filterItems.img}
                        ></Card>
                      </div>
                    )
                  })
                }
              </div>

            )
          })
          // : <div>Never return false as compairing the reference</div>
        }

      </div>
      <div><Footer /></div>
    </>
  );
};

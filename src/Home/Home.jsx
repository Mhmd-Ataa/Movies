import axios from 'axios';
import React, { useEffect, useState } from 'react';
import img from '../../src/search.svg';
import './Home.css'

const Home = () => {
    let [movie, setMovie] = useState([]);
    let [searchTerm, setSearch] = useState("");


    async function getMovies(title) {
        let { data } = await axios.get(`https://www.omdbapi.com/?apikey=b6003d8a&s=${title}`)
        setMovie(data.Search);
    }
    useEffect(() => {
        getMovies("all");
    }, [])

    return <>

        <div className='container'>
            <div className="pageTitle text-center  my-4 ">
                <h2>MovieLand</h2>
            </div>

            <div className="searchBar  d-flex justify-content-between align-items-center m-auto mt-5">
                <input type="text" className="w-100 px-3" value={searchTerm} onChange={(e) => setSearch(e.target.value)} placeholder="Search For Movie"/>
                <img src={img}  className="ms-2" onClick={ () => getMovies(searchTerm)} />
            </div>

            <div className="row mt-5">
                {movie?.length > 0 ? <>
                    {movie.map((item, index) => (
                        <div className="col-md-3 my-4" key={index}>
                            <div className="movieCard px-3">
                                <img src={item.Poster !== "N/A" ? item.Poster : "https://via.placeholder.com/400"}  />
                                <p className="ps-1">{item.Type}</p>
                                <h5>{item.Title}</h5>
                            </div>
                        </div>
                    ))} 
                </>:(
                    <div className=" vh-100 d-flex align-items-center justify-content-center" >
                        <i className="fa fa-spinner fa-spin" style={{fontSize:"50px"}}></i>
                    </div>
                )
}
                

            </div>

        </div>

    </>
}


export default Home;
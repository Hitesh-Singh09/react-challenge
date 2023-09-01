import React from 'react'
import "./DogBreeds.css"

import Favourite from './Favourite'
import {useState,useEffect} from "react"

const DogBreeds = () => {
const[search,setSearch]=useState('hound')
const[dogImages,setDogImages]=useState([]);
const [loading, setLoading] = useState(true);
const [favorites, setFavorites] = useState([]);

const getData=async()=>{
  try {
    setLoading(true);
    const res = await fetch(`https://dog.ceo/api/breed/${search}/images`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    setDogImages(data.message.slice(0, 10));
  } catch (error) {
    console.error(error);
    setDogImages([]); // Setting dogImages to an empty array in case of an error.
  } finally {
    setLoading(false);
  }
};
useEffect(()=>{
  getData();
},[])

const addToFavorites=(imageUrl)=>{
  if (!favorites.includes(imageUrl)) {
    setFavorites([...favorites, imageUrl]);
  }
}
const removeFromFavorites=(imageUrl)=>{
  const updatedFavorites = favorites.filter((fav) => fav !== imageUrl);
  setFavorites(updatedFavorites);
}


  return (
    <>
    <div className='container' >
    <div className="feed-page">
    <h1>Dog Breeds</h1>
    <div className="inputs">
    <input type="text" placeholder='Search here'   value={search} onChange={(e)=>setSearch(e.target.value.toLowerCase())}/>
    <button className="btn" onClick={getData}><i className="fa-solid fa-magnifying-glass fa-xl"></i>Search</button>
    </div>
   
    <div className="list">
    {loading ? (
      <p>Loading...</p>
    ) : dogImages.length > 0 ? (
      dogImages.map((imageUrl, index) => (
        <div key={index} className="card">
          {favorites.includes(imageUrl) ? (
            <span onClick={() => removeFromFavorites(imageUrl)}>❤️</span>
          ) : (
            <span onClick={() => addToFavorites(imageUrl)}>🤍</span>
          )}
          <img src={imageUrl} alt={`Dog ${index}`} />
        </div>
      ))
    ) : (
      <h1>No results Found</h1>
    )}
  </div>
    <Favourite favorites={favorites} removeFromFavorites={removeFromFavorites} />
    </div>
    </div>
   
    </>
  )
}

export default DogBreeds

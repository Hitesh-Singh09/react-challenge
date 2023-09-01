import React from 'react'
import "./Favourite.css";

const Favourite = ({favorites,removeFromFavorites}) => {
  return (
    <>
    <div className="favourite">
    <hr/>
    <div className="headers">
    <i className="fa-solid fa-heart fa-lg " style={{color:"#EE4957",marginTop:"16px",marginRight:"20px"}}></i>
    <h2>Favourites</h2>
    </div>
    <div className="fav-list">
    {favorites.map((favUrl, index) => (
      <div key={index} className="favorite-card">
        <img src={favUrl} alt={`Favorite Dog ${index}`} />
        <span onClick={() => removeFromFavorites(favUrl)} className='heart'>❤️</span>
       
      </div>
    ))}
    

    </div>
    </div>
    </>
  )
}

export default Favourite

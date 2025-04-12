import React, { useEffect, useState } from 'react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (id) => {
    const updatedList = wishlist.filter(car => car.id !== id);
    setWishlist(updatedList);
    localStorage.setItem("wishlist", JSON.stringify(updatedList));
    alert("Removed from wishlist");
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-heading">Your Wishlist</h1>
      <div className="show">
        {wishlist.length === 0 ? (
          <h2>No items in wishlist</h2>
        ) : (
          wishlist.map(car => (
            <div key={car.id} className="car-card">
              <img src={car.image} alt={car.model} className="car-img" />
              <h2>{car.brand} - {car.model}</h2>
              <p>Fuel: {car.fuel}</p>
              <p>Price: ₹{car.price}</p>
              <p>Seating: {car.seating}</p>
              <button className="wishlist-btn remove" onClick={() => handleRemove(car.id)}>
                Remove from Wishlist
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;

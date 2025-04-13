import React, { useEffect, useState } from 'react';

const Browse = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    fuel: "",
    price: "",
    seating: ""
  });

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/cars.json')
      .then(res => res.json())
      .then(data => {
        const carData = data.cars || data; // if data has a "cars" property, use it; otherwise assume data is an array
        setCars(carData);
        setFilteredCars(carData);
      })
      .catch(err => console.error("Error fetching cars:", err));
  }, []);
  

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleAddToWishlist = (car) => {
    const alreadyAdded = wishlist.find(item => item.id === car.id);
    if (!alreadyAdded) {
      setWishlist([...wishlist, car]);
      alert("Added to wishlist!");
    } else {
      alert("Car already in wishlist!");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const checkPrice = (carPrice, filter) => {
    if (filter === "under10") return carPrice <= 1000000;
    if (filter === "10to20") return carPrice > 1000000 && carPrice <= 2000000;
    if (filter === "above20") return carPrice > 2000000;
    return true;
  };

  useEffect(() => {
    const results = cars.filter(car => {
      return (
        (filters.search === "" || car.model.toLowerCase().includes(filters.search.toLowerCase())) &&
        (filters.brand === "" || car.brand === filters.brand) &&
        (filters.fuel === "" || car.fuel === filters.fuel) &&
        (filters.price === "" || checkPrice(car.price, filters.price)) &&
        (filters.seating === "" || String(car.seating) === filters.seating)
      );
    });
    setFilteredCars(results);
    setCurrentPage(1); // Reset to page 1 on filter change
  }, [filters, cars]);

  // Pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <div className="browse-container">
      <div className="browse-head">Buying a car? Check latest models now!</div>

      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search by model..."
          value={filters.search}
          onChange={handleFilterChange}
        />

        <select name="brand" value={filters.brand} onChange={handleFilterChange}>
          <option value="">All Brands</option>
          <option value="Toyota">Toyota</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Honda">Honda</option>
          <option value="Kia">Kia</option>
          <option value="Tesla">Tesla</option>
          <option value="Ford">Ford</option>
          <option value="Mahindra">Mahindra</option>
        </select>

        <select name="fuel" value={filters.fuel} onChange={handleFilterChange}>
          <option value="">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="CNG">CNG</option>
        </select>

        <select name="price" value={filters.price} onChange={handleFilterChange}>
          <option value="">All Prices</option>
          <option value="under10">Under ₹10L</option>
          <option value="10to20">₹10L–₹20L</option>
          <option value="above20">Above ₹20L</option>
        </select>

        <select name="seating" value={filters.seating} onChange={handleFilterChange}>
          <option value="">All Seating</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="9">9</option>
        </select>

        <button
          onClick={() => setFilters({
            search: "",
            brand: "",
            fuel: "",
            price: "",
            seating: ""
          })}
          className="clear-btn"
        >
          Clear Filters
        </button>
      </div>

      <div className="show">
        {currentCars.length > 0 ? (
          currentCars.map(car => (
            <div key={car.id} className="car-card">
              <img src={car.image} alt={car.model} className="car-img" />
              <h2>{car.brand} - {car.model}</h2>
              <p>Fuel: {car.fuel}</p>
              <p>Price: ₹{car.price}</p>
              <p>Seating: {car.seating}</p>
              <button className="wishlist-btn" onClick={() => handleAddToWishlist(car)}>Add to Wishlist</button>
            </div>
          ))
        ) : (
          <p>No cars match your criteria.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Browse;

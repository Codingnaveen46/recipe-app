import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

const Home = () => {
  return (
    <div>
      <h2>Welcome to Yours Kitchen</h2>
      <p>Explore our collection of delicious recipes.</p>
      <div className="home-images">
        <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Recipe 1" />
        <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Recipe 2" />
        <img src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Recipe 3" />
        <img src="https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Recipe 4" />
        <img src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <img src="https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <img src="https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <img src="https://images.pexels.com/photos/1860204/pexels-photo-1860204.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <img src="https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
      </div>
    </div>
  );
};



const Recipes = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // const APP_ID = '25930f56';  // Replace with your App ID
  // const APP_KEY = 'aec9fe4bab0abe53c42e2fcf69590196';  // Replace with your App Key

  const APP_ID = '9ba5585d';  // Replace with your App ID
  const APP_KEY = '850a5aac8a4c6638ea03ca5378d181c5';  // Replace with your App Key

  // const APP_ID = '9222838';  // Replace with your App ID
  // const APP_KEY = '850a5aac8a4c6638ea03ca5378d181c5';  // Replace with your App Key

  useEffect(() => {
    if (recipes.length > 0) {
      const recipesContainer = document.querySelector('.recipes');
      recipesContainer.classList.add('visible');
    }
  }, [recipes]);

  const getRecipes = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits || []); // Ensure recipes is always an array
    } catch (error) {
      console.error('Error fetching the recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getRecipes();
  };

  return (
    <div>
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="recipes">
          {recipes.map(({ recipe }) => (
            <div key={recipe.uri} className="recipe">
              <img src={recipe.image} alt={recipe.label} />
              <h2>{recipe.label}</h2>
              <div className="recipe-category">{recipe.category || 'Category'}</div>
              <ul>
                {/* Display additional recipe information here */}
                <li>Ingredients: {recipe.ingredients.map(ingredient => ingredient.text).join(', ')}</li>
                <li>Calories: {Math.round(recipe.calories)}</li>
                {/* Add more details as needed */}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h2>About Yours Kitchen</h2>
      <p>
        Yours Kitchen is a recipe website dedicated to helping you discover and
        create delicious meals. Our mission is to provide a wide variety of
        recipes from different cuisines, making it easy for you to find
        something that suits your taste and dietary preferences.
      </p>
      <p>
        We believe that cooking should be an enjoyable experience, and that's
        why we strive to provide clear and easy-to-follow instructions, along
        with beautiful images to inspire you in the kitchen.
      </p>
      <p>
        Our team of passionate food enthusiasts is constantly exploring new
        recipes and techniques to share with you. We hope that Yours Kitchen
        will become your go-to resource for all your culinary adventures.
      </p>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <ul className="footer-list">
        <li>&copy; Yours Kitchen {currentYear}</li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/start">Start Here</Link></li>
        {/* Add more footer links as needed */}
      </ul>
    </footer>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Yours Kitchen</h1>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/about">About</Link>
            {/* Add more navigation links as needed */}
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/about" element={<About />} /> 
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
};



export default App;
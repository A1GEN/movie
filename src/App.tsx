import AppHeader from './components/header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/home/Home';
import Movies from './pages/movies/Movies';
import WatchMovie from './pages/watch-movie/WatchMovie';
import About from './pages/about/About';
import Shop from './pages/shop/Shop';
import Favorites from './pages/favorites/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
// import { useEffect } from "react";
// import { API_BASE_URL, API_KEY } from "./constants/index";


const App = () => {

  // useEffect(() => {
  //   fetch(`${API_BASE_URL}/trending/movie/week${API_KEY}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data.results);
  //       SetMovies(data.results)
  //     })
  // }, [])


  return (
    <div>
      <FavoritesProvider>
        <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/watch/:id" element={<WatchMovie />} />
            <Route path="/*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </div>
  )
}

export default App
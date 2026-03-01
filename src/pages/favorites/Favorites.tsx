import React, { useEffect, useState } from 'react';
import { Typography, Card, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import { IMAGE_BASE_URL } from '../../constants';
import { useFavorites } from '../../context/FavoritesContext';

const { Title } = Typography;

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (favorites.length === 0) {
      setMovies([]);
      return;
    }
    setLoading(true);
    // fetch movie details individually
    Promise.all(
      favorites.map(id =>
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2fa8f297328a4293f06805fe0c1b915d`).then(r => r.json())
      )
    )
      .then(res => setMovies(res))
      .finally(() => setLoading(false));
  }, [favorites]);

  return (
    <div className="movies-page">
      <div className="movies-header">
        <Title>Избранное</Title>
      </div>
      {loading ? (
        <Spin />
      ) : movies.length === 0 ? (
        <p style={{ padding: 40, color: 'white' }}>Вы пока не добавили ничего в избранное.</p>
      ) : (
        <div className="movie-row">
          {movies.map(m => (
            <Card
              key={m.id}
              hoverable
              className="movie-card"
              cover={<img alt={m.title} src={`${IMAGE_BASE_URL}${m.poster_path}`} />}
              onClick={() => navigate(`/watch/${m.id}`)}
            >
              <Card.Meta title={m.title} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

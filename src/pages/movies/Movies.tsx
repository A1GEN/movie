import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Typography, Button, Card, Dropdown, Menu, Spin } from 'antd';
import { DownOutlined, PlayCircleFilled, BookOutlined, BookFilled } from '@ant-design/icons';
import './Movies.css';
import { useNavigate } from 'react-router-dom';
import { getPopularMovies, getUpcomingMovies, searchMovies } from '../../service/api';
import { useFavorites } from '../../context/FavoritesContext';
import { IMAGE_BASE_URL } from '../../constants';
import TrailerModal from '../../components/trailer-modal/TrailerModal';

const { Title, Paragraph } = Typography;

const filterMenu = (label: string) => (
  <Menu>
    <Menu.Item key="1">Option 1</Menu.Item>
    <Menu.Item key="2">Option 2</Menu.Item>
  </Menu>
);

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Movies = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalMovieId, setModalMovieId] = useState<number | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { isFav, toggle } = useFavorites();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    setLoading(true);
    if (query) {
      // perform search
      searchMovies(query)
        .then(res => {
          setRecommendations(res.results || []);
          setNewReleases([]);
        })
        .finally(() => setLoading(false));
    } else {
      Promise.all([getPopularMovies(), getUpcomingMovies()])
        .then(([pop, up]) => {
          setRecommendations(pop.results || []);
          setNewReleases(up.results || []);
        })
        .finally(() => setLoading(false));
    }
  }, [location.search]);


  return (
    <div className="movies-page">
      <div className="movies-header">
        <Title>Фильмы</Title>
        <Paragraph>Онлайн-кинотеатр собрал для своих подписчиков коллекцию из тысяч фильмов.</Paragraph>
        <NavLink className="read-all" to="/movies">Читать всё</NavLink>
      </div>

      {/* фильтры */}
      <div className="movies-filters">
        <Button className="filter-btn" type="default">Бесплатно</Button>
        <Dropdown overlay={filterMenu('Рекомендуемые')}>
          <Button className="filter-btn">
            Рекомендуемые <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown overlay={filterMenu('Жанры')}>
          <Button className="filter-btn">
            Жанры <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown overlay={filterMenu('Страны')}>
          <Button className="filter-btn">
            Страны <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown overlay={filterMenu('Годы')}>
          <Button className="filter-btn">
            Годы <DownOutlined />
          </Button>
        </Dropdown>
        <Button className="filter-btn" type="default">Новое</Button>
        <Button className="filter-btn" type="default">Высокий рейтинг</Button>
        <Button className="filter-btn" type="default">Лучшее</Button>
      </div>

      {loading ? (
        <Spin />
      ) : (
        <>
          <div className="movies-section">
            <Title level={2}>Рекомендации</Title>
            <div className="movie-row">
              {recommendations.map(m => (
                <Card
                  key={m.id}
                  hoverable
                  className="movie-card"
                  cover={<img alt={m.title} src={`${IMAGE_BASE_URL}${m.poster_path}`} />}
                  onClick={() => navigate(`/watch/${m.id}`)}
                  actions={[
                    <PlayCircleFilled
                      key="trailer"
                      onClick={e => {
                        e.stopPropagation();
                        setModalMovieId(m.id);
                        setModalTitle(m.title);
                        setModalOpen(true);
                      }}
                    />,
                    <span
                      key="fav"
                      onClick={e => {
                        e.stopPropagation();
                        toggle(m.id);
                      }}
                    >
                      {isFav(m.id) ? <BookFilled style={{ color: '#52c41a' }} /> : <BookOutlined />}
                    </span>
                  ]}
                >
                  <Card.Meta title={m.title} />
                </Card>
              ))}
            </div>
          </div>

          <div className="movies-section">
            <Title level={2}>Новинки фильмов</Title>
            <div className="movie-row">
              {newReleases.map(m => (
                <Card
                  key={m.id}
                  hoverable
                  className="movie-card"
                  cover={<img alt={m.title} src={`${IMAGE_BASE_URL}${m.poster_path}`} />}
                  onClick={() => navigate(`/watch/${m.id}`)}
                  actions={[
                    <PlayCircleFilled
                      key="trailer"
                      onClick={e => {
                        e.stopPropagation();
                        setModalMovieId(m.id);
                        setModalTitle(m.title);
                        setModalOpen(true);
                      }}
                    />,
                    <span
                      key="fav"
                      onClick={e => {
                        e.stopPropagation();
                        toggle(m.id);
                      }}
                    >
                      {isFav(m.id) ? <BookFilled style={{ color: '#52c41a' }} /> : <BookOutlined />}
                    </span>
                  ]}
                >
                  <Card.Meta title={m.title} />
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* trailer modal */}
      <TrailerModal
        movieId={modalMovieId}
        title={modalTitle}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Movies;

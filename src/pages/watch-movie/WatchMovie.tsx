import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, Space, Tag, Spin } from 'antd';
import { API_BASE_URL, API_KEY, IMAGE_BASE_URL } from '../../constants';
import TrailerModal from '../../components/trailer-modal/TrailerModal';
import { useFavorites } from '../../context/FavoritesContext';
import {
  PlayCircleFilled,
  StarFilled,
  ShareAltOutlined,
  PlaySquareOutlined
} from '@ant-design/icons';
import './WatchMovie.css'; // Стили для страницы просмотра фильма
import { Bookmark } from 'lucide-react';

const { Title, Text } = Typography;

const WatchMovie = () => {
  // URL'ден фильмдин IDсин алуу (мисалы: /watch/123)
  const { id } = useParams();
  const [movieData, setMovieData] = React.useState<any>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const { isFav, toggle } = useFavorites();

  // movieData is already loaded above, title available

  React.useEffect(() => {
    if (!id) return;

    // получить основную информацию
    fetch(`${API_BASE_URL}movie/${id}${API_KEY}`)
      .then(r => r.json())
      .then(data => {
        setMovieData(data);
      })
      .catch(console.error);

  }, [id]);

  if (!movieData) {
    return <div style={{ padding: 40, color: 'white' }}><Spin /></div>;
  }

  const background = movieData.backdrop_path || movieData.poster_path;
  const genres: string[] = movieData.genres ? movieData.genres.map((g: any) => g.name) : [];

  return (
    <div className="watch-container" style={{ backgroundImage: `url(${IMAGE_BASE_URL}${background})` }}>
      <div className="watch-overlay"></div>

      <div className="watch-content">
        {/* Жанрлар жана Мета маалымат */}
        <div className="meta-info">
          {genres.map(genre => <span key={genre}>{genre}</span>)}
          <div className="dot"></div>
          <span>{movieData.release_date ? movieData.release_date.slice(0,4) : ''}</span>
          {/* duration and age not in basic API; skip */}
          <div className="dot"></div>
          <span>{movieData.runtime ? movieData.runtime + ' мин' : ''}</span>
          <div className="dot"></div>
          <span>{movieData.adult ? '18+' : '12+'}</span>
          <div className="dot"></div>
          <Space size={4}>
            <StarFilled style={{ color: '#52c41a' }} />
            <Text style={{ color: '#52c41a' }}>{movieData.vote_average}</Text>
          </Space>
        </div>

        {/* Ижара Тэги */}
        <Tag color="blue" style={{ marginBottom: 20, borderRadius: 4 }}>
          Аренда эпизода
        </Tag>

        {/* Негизги Аталышы */}
        <div style={{ marginBottom: 30 }}>
          <Title level={1} style={{ color: 'white', margin: 0, fontSize: '48px', textTransform: 'uppercase' }}>
            {movieData.title}
          </Title>
          <Text style={{ color: '#fadb14', fontSize: '24px', fontWeight: 'bold' }}>
            {movieData.tagline}
          </Text>
        </div>

        {/* Баскычтар (Action Buttons) */}
        <Space className="action-buttons" size="middle" wrap>
          <Button
            type="primary"
            size="large"
            icon={<PlayCircleFilled />}
            style={{ backgroundColor: '#c41d7f', borderColor: '#c41d7f' }}
          >
            Смотреть
          </Button>

          <Button
            ghost
            size="large"
            icon={<PlaySquareOutlined />}
            style={{ background: 'rgba(255,255,255,0.1)' }}
            onClick={() => setModalOpen(true)}
          >
            Трейлер
          </Button>

          <Button ghost size="large" style={{ background: 'rgba(255,255,255,0.1)' }}>
            Оценить
          </Button>

          <Button ghost size="large" icon={<ShareAltOutlined />} style={{ background: 'rgba(255,255,255,0.1)' }}>
            Поделиться
          </Button>

          <Button
            ghost
            size="large"
            icon={<Bookmark style={{ color: isFav(Number(id)) ? '#52c41a' : undefined }} />}
            style={{ background: 'rgba(255,255,255,0.1)' }}
            onClick={() => toggle(Number(id))}
          />
        </Space>
      </div>

      {/* trailer modal */}
      <TrailerModal
        movieId={Number(id)}
        title={movieData.title}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default WatchMovie;

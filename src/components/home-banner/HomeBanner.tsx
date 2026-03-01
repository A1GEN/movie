import React from 'react';
import { Typography, Space, Button } from 'antd';
import { PlayCircleFilled, PlusOutlined, StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_KEY, IMAGE_BASE_URL } from '../../constants';
import './HomeBanner.css';

const { Title, Text, Paragraph } = Typography;

const HomeBanner = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = React.useState<any>(null);

  React.useEffect(() => {
    // pick a random popular movie
    fetch(`${API_BASE_URL}movie/popular${API_KEY}`)
      .then(r => r.json())
      .then(data => {
        if (data.results && data.results.length) {
          const m = data.results[Math.floor(Math.random() * data.results.length)];
          setMovie(m);
        }
      });
  }, []);

  const movieId = movie ? movie.id : null;

  if (!movie) {
    return <div className="hero-banner" style={{height: '400px', background: '#000'}} />;
  }

  return (
    <div className="hero-banner" style={{ backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path})` }}>
      <div className="banner-content">
        {/* Сезон жана Эпизод (not available) */}
        <Text style={{ color: '#aaa', textTransform: 'uppercase' }}>
          {movie.release_date ? movie.release_date.slice(0,4) : ''}
        </Text>

        {/* Рейтинг жана Жыл */}
        <div className="banner-meta" style={{ marginTop: 10 }}>
          <Space>
            <StarFilled style={{ color: '#fadb14' }} />
            <Text strong style={{ color: 'white' }}>{movie.vote_average}</Text>
            <Text style={{ color: '#aaa' }}>{movie.genres?.map((g:any)=>g.name).join(' • ')}</Text>
          </Space>
        </div>

        {/* Аталышы */}
        <Title className="banner-title">{movie.title}</Title>

        {/* Сүрөттөмө */}
        <Paragraph className="banner-desc">
          {movie.overview}
        </Paragraph>

        {/* Баскычтар */}
        <Space size="large">
          <Button
            type="primary"
            danger
            shape="round"
            size="large"
            icon={<PlayCircleFilled />}
            style={{ paddingLeft: 30, paddingRight: 30 }}
            onClick={() => movieId && navigate(`/watch/${movieId}`)}
          >
            WATCH
          </Button>
          <Button
            ghost
            shape="round"
            size="large"
            icon={<PlusOutlined />}
            style={{ color: 'white', borderColor: 'white' }}
          >
            ADD LIST
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default HomeBanner;

import React, { useEffect, useState } from 'react';
import HomeBanner from "../../components/home-banner/HomeBanner";
import { Typography, Card, Spin } from 'antd';
import { PlayCircleFilled, BookOutlined, BookFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getPopularMovies } from '../../service/api';
import { useFavorites } from '../../context/FavoritesContext';
import TrailerModal from '../../components/trailer-modal/TrailerModal';
import { IMAGE_BASE_URL } from '../../constants';
import './Home.css';

const { Title } = Typography;

const Home = () => {
    const navigate = useNavigate();
    const [popular, setPopular] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalMovieId, setModalMovieId] = useState<number | null>(null);
    const [modalTitle, setModalTitle] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const { isFav, toggle } = useFavorites();

    useEffect(() => {
        setLoading(true);
        getPopularMovies().then(res => {
            setPopular(res.results || []);
        }).finally(() => setLoading(false));
    }, []);


    return (
        <div>
            <HomeBanner />
            <div className="home-section">
              <Title level={2} style={{ color: 'white', marginLeft: '5%' }}>Популярное</Title>
              {loading ? <Spin style={{ margin: '20px' }} /> : (
                <div className="movie-row">
                  {popular.map(m => (
                    <Card
                      key={m.id}
                      hoverable
                      className="movie-card"
                      cover={<img alt={m.title} src={`${IMAGE_BASE_URL}${m.poster_path}`} />}
                      onClick={() => navigate(`/watch/${m.id}`)}
                      style={{ width: 160, margin: '0 10px' }}
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
                    />
                  ))}
                </div>
              )}
            </div>

            {/* trailer modal */}
            <TrailerModal
              movieId={modalMovieId}
              title={modalTitle}
              open={modalOpen}
              onClose={() => setModalOpen(false)}
            />
        </div>
    )
}

export default Home


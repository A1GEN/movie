import React, { useEffect, useState } from 'react';
import { Modal, Spin, Button, Space } from 'antd';
import { getMovieVideos } from '../../service/api';
import { CloseOutlined } from '@ant-design/icons';

interface TrailerModalProps {
  movieId: number | null;
  title: string;
  open: boolean;
  onClose: () => void;
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

// simple in-memory cache so we avoid fetching same movie twice
const videoCache: Map<number, Video[]> = new Map();

const TrailerModal: React.FC<TrailerModalProps> = ({ movieId, title, open, onClose }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || movieId === null) return;
    setLoading(true);
    setVideos([]);
    setSelectedKey(null);

    // check cache first
    const cached = videoCache.get(movieId);
    if (cached) {
      setVideos(cached);
      let defaultVid = cached.find(v => v.type === 'Trailer');
      if (!defaultVid && cached.length) defaultVid = cached[0];
      if (defaultVid) setSelectedKey(defaultVid.key);
      setLoading(false);
      return;
    }

    getMovieVideos(movieId)
      .then(res => {
        const ytVideos = res.results.filter(v => v.site === 'YouTube');
        videoCache.set(movieId, ytVideos);
        setVideos(ytVideos);
        // default selection: first trailer, else any
        let defaultVid = ytVideos.find(v => v.type === 'Trailer');
        if (!defaultVid && ytVideos.length) defaultVid = ytVideos[0];
        if (defaultVid) setSelectedKey(defaultVid.key);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [open, movieId]);

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onClose}
      width={800}
      bodyStyle={{ padding: 0 }}
      closeIcon={<CloseOutlined style={{ color: '#fff', fontSize: 20 }} />}
    >
      {loading ? (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <Spin />
        </div>
      ) : selectedKey ? (
        <>
          {videos.length > 1 && (
            <Space style={{ padding: '10px', justifyContent: 'center' }}>
              {videos.map(v => (
                <Button
                  key={v.id}
                  size="small"
                  ghost={v.key !== selectedKey}
                  onClick={() => setSelectedKey(v.key)}
                >
                  {v.type || v.name}
                </Button>
              ))}
            </Space>
          )}
          <iframe
            width="100%"
            height="450"
            src={`https://www.youtube.com/embed/${selectedKey}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </>
      ) : (
        <div style={{ padding: 40, textAlign: 'center' }}>
          Трейлер недоступен
          <div style={{ marginTop: 10 }}>
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                title + ' trailer'
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#1890ff' }}
            >
              Найти на YouTube
            </a>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TrailerModal;

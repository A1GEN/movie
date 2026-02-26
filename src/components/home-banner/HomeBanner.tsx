import { Typography, Space, Button } from 'antd';
import { PlayCircleFilled, PlusOutlined, StarFilled } from '@ant-design/icons';
import './HomeBanner.css';

const { Title, Text, Paragraph } = Typography;

const HomeBanner = () => {
  return (
    <div className="hero-banner">
      <div className="banner-content">
        {/* Сезон жана Эпизод */}
        <Text style={{ color: '#aaa', textTransform: 'uppercase' }}>
          Season 1 • 16 Episode
        </Text>

        {/* Рейтинг жана Жыл */}
        <div className="banner-meta" style={{ marginTop: 10 }}>
          <Space>
            <StarFilled style={{ color: '#fadb14' }} />
            <Text strong style={{ color: 'white' }}>9.1</Text>
            <Text style={{ color: '#aaa' }}>2017 • Exciting story • 2 season</Text>
          </Space>
        </div>

        {/* Аталышы */}
        <Title className="banner-title">SAVE ME</Title>

        {/* Сүрөттөмө */}
        <Paragraph className="banner-desc">
          Series adapted from the webcomic entitled Out of the World by writer Jo Geum-san.
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

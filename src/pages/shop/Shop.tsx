import React from 'react';
import { Typography, Card, Button } from 'antd';
import './Shop.css';

const { Title, Paragraph } = Typography;

const Shop: React.FC = () => {
  return (
    <div className="shop-page">
      <Title level={2} style={{ color: '#fff' }}>Магазин</Title>
      <Paragraph style={{ color: '#bbb', maxWidth: 600, margin: '0 auto' }}>
        В магазине NETFLEX вы можете приобрести подписку, мерч или эксклюзивный
        контент. Это демонстрационная страница — не забудьте заменить на реальный
        магазин позже.
      </Paragraph>
      <Card
        style={{
          background: '#222',
          border: '1px solid #333',
          marginTop: 20,
        }}
      >
        <Button type="primary" style={{ background: '#e50914', borderColor: '#e50914' }}>
          Перейти в магазин
        </Button>
      </Card>
    </div>
  );
};

export default Shop;

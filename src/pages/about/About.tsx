import React from 'react';
import { Typography, Card } from 'antd';
import './About.css';

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
  return (
    <div className="about-page">
      <Title level={2} style={{ color: '#fff' }}>О нас</Title>
      <Paragraph style={{ color: '#bbb', maxWidth: 600, margin: '0 auto' }}>
        Добро пожаловать на NETFLEX — ваш персональный онлайн‑кинотеатр! Мы стремимся
        предоставить вам самую удобную и красивую платформу для просмотра любимых
        фильмов и сериалов. Наша команда постоянно работает над расширением
        каталога и улучшением интерфейса.
      </Paragraph>
      <Card
        style={{
          background: '#222',
          border: '1px solid #333',
          color: '#fff',
          marginTop: 20,
        }}
      >
        <Paragraph style={{ color: '#ccc' }}>
          Здесь могут быть заявлены миссия проекта, контакты, информация о команде
          и т.п. Пока что это заглушка — добавьте свой текст!
        </Paragraph>
      </Card>
    </div>
  );
};

export default About;

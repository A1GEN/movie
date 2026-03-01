import React from 'react';
import { Layout, Menu, Button, Space, Avatar, Typography, Input } from 'antd';
import { UserOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import netflixLogo from '../../assets/netflix-logo.svg';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const onSearchSubmit = () => {
    if (search.trim()) navigate(`/movies?query=${encodeURIComponent(search.trim())}`);
  };

  const menuItems = [
    { key: '1', label: <NavLink to="/">Главная</NavLink> },
    { key: '2', label: <NavLink to="/movies">Каталог</NavLink> },
    { key: '3', label: <NavLink to="/favorites">Избранное</NavLink> },
    { key: '4', label: <NavLink to="/shop">Магазин</NavLink> },
    { key: '5', label: <NavLink to="/about">О нас</NavLink> },
  ];

  return (
    <Header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#141414',
      padding: '0 20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
      zIndex: 1000,
    }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/') }>
        <img src={netflixLogo} alt="NETFLEX" style={{ width: 32, height: 32, marginRight: 8 }} />
        <Text strong style={{ fontSize: '22px', color: '#fff', letterSpacing: '1px' }}>
          NETFLEX
        </Text>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={menuItems}
        style={{
          flex: 1,
          minWidth: 0,
          justifyContent: 'center',
          borderBottom: 'none',
          background: 'transparent',
        }}
      />

      <Space size="middle" align="center">
        <Input
          prefix={<SearchOutlined style={{ color: '#888' }} />}
          placeholder="Поиск фильмов..."
          style={{ width: 250, borderRadius: 20 }}
          value={search}
          onChange={e => setSearch(e.target.value)}
          onPressEnter={onSearchSubmit}
        />
        <Button type="text" style={{ color: '#fff' }}>
          Войти
        </Button>
        <Button
          type="primary"
          style={{ background: '#e50914', borderColor: '#e50914' }}
        >
          Оформить подписку
        </Button>
        <BellOutlined style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }} />
        <Avatar
          icon={<UserOutlined />}
          style={{ cursor: 'pointer', color: '#fff' }}
        />
      </Space>
    </Header>
  );
};

export default AppHeader;


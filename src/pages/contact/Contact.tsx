import React from 'react';
import { Typography } from 'antd';
import './Contact.css';

const { Title, Paragraph } = Typography;

const Contact = () => {
  return (
    <div className="contact-page">
      <Title level={1}>Контакт</Title>
      <Paragraph>Напишите нам на support@netflex.example или позвоните 8-800-123-45-67</Paragraph>
    </div>
  );
};

export default Contact;

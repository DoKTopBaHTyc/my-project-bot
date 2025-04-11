import React, { useState } from 'react';
import { Link } from 'react-router';
import './Navbar.css';

const NeonNavbar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const redirectToRandomSite = async () => {
    const response = await fetch('https://fakerapi.it/api/v1/images?_quantity=1');
    const { data } = await response.json();
    window.open(data[0].url, '_blank'); // Открывает случайное изображение
  };

  return (
    <>
      <div
        className="hover-zone"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      />
      <div
        className={`neon-navbar ${visible ? 'visible' : ''}`}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <div className="navbar-content">
          <Link to="/" className="nav-link">
            Главная
          </Link>
          <Link to="/not-main" className="nav-link">
            Не главная
          </Link>
          <Link to="/even-less-main" className="nav-link">
            Тем более не главная
          </Link>
          <Link to="/totally-not-main" className="nav-link">
            Вообще не главная
          </Link>
          <button
            onClick={redirectToRandomSite}
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Выйти
          </button>
        </div>
      </div>
    </>
  );
};

export default NeonNavbar;

import './navbar.scss';
import logo from '../../images/cryptocurrency.png';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoneyCollectOutlined,
  FundOutlined,
  BulbOutlined,
  HomeOutlined
} from '@ant-design/icons/lib/icons';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [activeIcon, setActiveIcon] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  

  const toggleMenuIcon = () => {
    setActiveIcon(!activeIcon);
    setShowMenu(!showMenu);
  };

  return (
    <div className={showMenu ? "navbar" : "navbar hidden"}>
      <div className="navbar_container">
        <div className="navbar_menu">
          {activeIcon ? (
            <MenuFoldOutlined onClick={toggleMenuIcon} />
          ) : (
            <MenuUnfoldOutlined onClick={toggleMenuIcon} />
          )}
        </div>
        <div className="navbar_logo">
          <img src={logo} alt="crypto" />
          <h3>Cryptoverse</h3>
        </div>
        <div className="navbar_links">
          <div className="navbar-link">
            <NavLink exact to="/">
            <HomeOutlined />
              <span className="link-name">Home</span>
            </NavLink>
            <NavLink to="/cryptocurrencies">
              <FundOutlined />
              <span className="link-name">Cryptocurrencies</span>
            </NavLink>
          </div>
          <div className="navbar-link">
            <NavLink to="/exchanges">
              <MoneyCollectOutlined />
              <span className="link-name">Exchanges</span>
            </NavLink>
          </div>
          <div className="navbar-link">
            <NavLink to="/news">
              <BulbOutlined />
              <span className="link-name">News</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

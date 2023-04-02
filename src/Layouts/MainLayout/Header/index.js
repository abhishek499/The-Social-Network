import "./Header.style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "svg";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import { useClickOutside } from "helpers/clickOutside";
import UserMenu from "./UserMenu/UserMenu";

function Header() {
  const color = "#65676b";
  const {
    userData: {
      login: { picture, first_name },
    },
  } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.userData.login);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allMenu = useRef(null);
  const userMenu = useRef(null);
  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSearchMenu(true)}>
          <Search color={color} />
          <input
            type="text"
            name=""
            placeholder="Search Facebook"
            id=""
            className=""
          />
        </div>
      </div>

      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className="header_middle">
        <Link to="/" className="middle_icon active">
          <HomeActive />
        </Link>
        <Link to="/" className="middle_icon hover-1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover-1">
          <Watch color={color} />
          <div className="middle_notification">+9</div>
        </Link>
        <Link to="/" className="middle_icon hover-1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover-1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link to="/profile" className="profile_link hover1">
          <img src={picture || ""} alt="" />
          <span>{first_name || ""}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
          onClick={() => setShowAllMenu(!showAllMenu)}
          ref={allMenu}
        >
          <Menu />
          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div className="circle_icon hover1" ref={userMenu}>
          <div onClick={() => setShowUserMenu(!showUserMenu)}>
            <ArrowDown />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}

export default Header;

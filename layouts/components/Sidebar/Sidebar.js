"use client";
import config from "../../../config";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import Menu, { MenuItem } from "./Menu";
import {
  HomeIcon,
  HomeActiveIcon,
  UserGroupIcon,
  UserGroupActiveIcon,
  LiveIcon,
  LiveActiveIcon,
} from "../../../components/icons";
import Footer from "./footer";
import SuggestedAccounts from "../../../components/SuggestedAccounts";
import FollowingAccounts from "../../../components/SuggestedAccounts/FollowingAccounts";
import Discover from "../../../components/Discover";
import Button from "../../../components/Button";
import Login from "../../../components/Login";
import useAuthStore from "../../../store/authStore";

const cx = classNames.bind(styles);

function Sidebar() {
  const [login, setLogin] = useState(false);
  //const [currentUser, setCurrentUser] = useState(false);
  //const [userLogin, setUserLogin] = useState('');

  const { userProfile } = useAuthStore();

  useEffect(() => {
    if (userProfile !== "") {
      setLogin(false);
    }
  }, [userProfile]);

  //let user = localStorage.getItem('user');
  //let data = JSON.parse(localStorage.getItem('data'));

  // if (currentUser) {
  //     localStorage.setItem('user', currentUser);
  //     localStorage.setItem('data', JSON.stringify(userLogin));
  // }

  // useEffect(() => {
  //     if (currentUser) {
  //         props.parentCallback(currentUser);
  //     }
  // });

  // useEffect(() => {
  //     if (userLogin !== '') {
  //         props.parentCallback(userLogin);
  //     }
  // });

  // useEffect(() => {
  //     if (userLogin !== '') {
  //         setCurrentUser(true);
  //         setLogin(false);
  //     }
  // }, [userLogin]);

  return (
    <>
      <div className={cx("scroll")}>
        <aside className={cx("wrapper")}>
          <Menu>
            <MenuItem
              title="For You"
              to={config.routes.home}
              icon={<HomeIcon />}
              activeIcon={<HomeActiveIcon />}
            />
            <MenuItem
              title="Following"
              to={config.routes.following}
              icon={<UserGroupIcon />}
              activeIcon={<UserGroupActiveIcon />}
            />
            {/* <MenuItem
              title="LIVE"
              to={config.routes.live}
              icon={<LiveIcon />}
              activeIcon={<LiveActiveIcon />}
            /> */}
          </Menu>
          {/* {!user && ( */}
          {!userProfile && (
            <div className={cx("login")}>
              <p className={cx("info")}>
                Log in to follow creators, like videos, and view comments.
              </p>
              <Button
                className={cx("login-btn")}
                outline
                onClick={() => setLogin(true)}
              >
                Log in
              </Button>
            </div>
          )}
          <SuggestedAccounts
            className={cx("suggested-accounts")}
            label="Suggested accounts"
          />
          {/* {user && ( */}
          {userProfile && (
            <FollowingAccounts
              className={cx("suggested-accounts")}
              label="Following accounts"
            />
          )}
          <Discover label="Discover" />
          <Footer />
        </aside>
      </div>
      {login && (
        <>
          <div className={cx("header")} onClick={() => setLogin(false)}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 48 48"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.1718 23.9999L10.2931 13.1212C9.90261 12.7307 9.90261 12.0975 10.2931 11.707L11.7074 10.2928C12.0979 9.90228 12.731 9.90228 13.1216 10.2928L24.0002 21.1715L34.8789 10.2928C35.2694 9.90228 35.9026 9.90228 36.2931 10.2928L37.7073 11.707C38.0979 12.0975 38.0979 12.7307 37.7073 13.1212L26.8287 23.9999L37.7073 34.8786C38.0979 35.2691 38.0979 35.9023 37.7073 36.2928L36.2931 37.707C35.9026 38.0975 35.2694 38.0975 34.8789 37.707L24.0002 26.8283L13.1216 37.707C12.731 38.0975 12.0979 38.0975 11.7074 37.707L10.2931 36.2928C9.90261 35.9023 9.90261 35.2691 10.2931 34.8786L21.1718 23.9999Z"
              ></path>
            </svg>
          </div>
          <Login className={cx("login")} />
        </>
      )}
    </>
  );
}

export default Sidebar;

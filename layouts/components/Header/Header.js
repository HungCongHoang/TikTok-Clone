// Import thư viện
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faEarthAsia,
  faCircleQuestion,
  faKeyboard,
  faUser,
  faCoins,
  faGear,
  faCloudArrowUp,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";

// Import file trong dự án
import config from "../../../config";
import styles from "./Header.module.scss";
import Image1 from "../../../components/image/image";
import Button from "../../../components/Button/Button";
import Menu from "../../../components/Popper/Menu/Menu";
import { MessageIcon, EmailIcon } from "../../../components/icons/icons";
import Search from "../Search/Search";
import Login from "../../../components/Login";

import useAuthStore from "../../../store/authStore";
import { googleLogout } from "@react-oauth/google";
import { Logo2 } from "../../../components/icons/icons";
import axios from "axios";

const cx = classNames.bind(styles);

//biến tạm
// const currentUser = false;

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          type: "language",
          code: "en",
          title: "English",
        },
        {
          type: "language",
          code: "vi",
          title: "Tiếng Việt",
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Feedback and help",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Keyboard shortcuts",
  },
];

function Header() {
  const [login, setLogin] = useState(false);
  //const [currentUser, setCurrentUser] = useState(false);
  //const [userLogin, setUserLogin] = useState('');

  // let user = localStorage.getItem('user');
  // let data = JSON.parse(localStorage.getItem('data'));
  // let dataUser = props.dataFromParent;

  const { userProfile, removeUser } = useAuthStore();

  //console.log(data.picture);

  // useEffect(() => {
  //     props.parentCallback(currentUser);
  // });

  // if (currentUser) {
  //     localStorage.setItem('user', currentUser);
  //     localStorage.setItem('data', JSON.stringify(userLogin));
  // }

  // Handle logic

  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case "language":
        break;
      default:
    }
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View profile",
      to: "/@user",
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Get coins",
      to: "/coin",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Settings",
      to: "/setting",
    },
    ...MENU_ITEMS,
    // {
    //     icon: <FontAwesomeIcon icon={faSignOut} />,
    //     title: 'Log out',
    //     to: '/logout',
    //     separate: true,
    // },
  ];

  useEffect(() => {
    if (userProfile !== "") {
      setLogin(false);
    }
  }, [userProfile]);

  // const handleLogout = () => {
  //     setCurrentUser(false);
  //     localStorage.removeItem('user');
  //     localStorage.removeItem('data');
  // };
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>
          <Link to={config.routes.home} className={cx("logo-link")}>
            {/* <img src={images.logo} alt="Tiktok"></img> */}
            <Logo2 />
          </Link>
        </div>

        <Search />

        <div className={cx("actions")}>
          {/* {dataUser || user ? ( */}
          {userProfile ? (
            <>
              <Link to={config.routes.upload}>
                <Tippy
                  delay={[0, 200]}
                  content="Upload Video"
                  placement="bottom"
                >
                  <button className={cx("action-btn")}>
                    <FontAwesomeIcon
                      style={{
                        color: "rgb(255, 59, 92)",
                      }}
                      icon={faCloudArrowUp}
                    />
                  </button>
                </Tippy>
              </Link>

              <Tippy content="Message" placement="bottom">
                <button className={cx("action-btn")}>
                  <MessageIcon />
                </button>
              </Tippy>

              <Tippy content="Email" placement="bottom">
                <button className={cx("action-btn")}>
                  <EmailIcon />
                  <div className={cx("email-notification")}>
                    <span className={cx("notification")}>24</span>
                  </div>
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <div className={cx("upload-btn")}>
                <FontAwesomeIcon className={cx("icon-plus")} icon={faPlus} />
                <Link to={config.routes.upload}>
                  <span className={cx("upload")}>Upload</span>
                </Link>
              </div>
              <Button primary onClick={() => setLogin(true)}>
                Log In
              </Button>
            </>
          )}
          {/* dataUser || user */}
          <Menu
            // items={user ? userMenu : MENU_ITEMS}
            items={userProfile ? userMenu : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {userProfile ? (
              <Image1
                width={40}
                height={40}
                src={userProfile.image}
                className={cx("user-avatar")}
                alt="Nguyen Van A"
                fallback={userProfile.image}
              />
            ) : (
              <button className={cx("more-btn")}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>

          {/* {user && ( */}
          {userProfile && (
            <button
              style={{
                //backgroundColor: "white",
                backgroundColor: "black",
              }}
            >
              <FontAwesomeIcon
                style={{
                  marginLeft: "20px",
                  //backgroundColor: "white",
                  color: "white",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
                // onClick={handleLogout}
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
                icon={faRightFromBracket}
              />
            </button>
          )}
        </div>
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
    </header>
  );
}

export default Header;

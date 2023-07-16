import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  QRCodeIcon,
  PeopleIcon,
  FacebookIcon,
  //GoogleIcon,
  InstagramIcon,
  LineIcon,
  KakaoTalkIcon,
  TwitterIcon,
  AppleIcon,
} from "../../components/icons";
//import { createOrGetUser } from '~/utils/getUser.js';
import jwt_decode from "jwt-decode";

import useAuthStore from "../../store/authStore";

const cx = classNames.bind(styles);

const clientId = process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN;
//"177510185389-heu07skee6ri1jf379g593miaa0nrfr8.apps.googleusercontent.com";
function Login() {
  const buttons = [
    {
      href: "",
      icon: <QRCodeIcon width={20} height={20} />,
      text: "Use QR code",
    },
    {
      href: "/login/phone-or-email",
      icon: <PeopleIcon width={20} height={20} />,
      text: "Use phone / email / username",
    },
    {
      icon: <FacebookIcon width={20} height={20} />,
      text: "Continue with Facebook",
    },
    // {
    //     icon: <GoogleIcon width={20} height={20} />,
    //     text: 'Continue with Google',
    // },
    {
      icon: <LineIcon width={20} height={20} />,
      text: "Continue with Line",
    },
    {
      icon: <TwitterIcon width={20} height={20} />,
      text: "Continue with Twitter",
    },
    {
      icon: <KakaoTalkIcon width={20} height={20} />,
      text: "Continue with KakaoTalk",
    },
    {
      icon: <AppleIcon width={20} height={20} />,
      text: "Continue with Apple",
    },
    {
      icon: <InstagramIcon width={20} height={20} />,
      text: "Continue with Instagram",
    },
  ];

  const { addUser } = useAuthStore();

  const renderButtons = () => {
    return buttons.map((button, key) => {
      return button.href ? (
        <a
          href={button.href}
          key={key}
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <div className={cx("button")}>
            <div className={cx("icon")}>{button.icon}</div>
            {button.text}
          </div>
        </a>
      ) : (
        <div key={key}>
          <div className={cx("button")}>
            <div className={cx("icon")}>{button.icon}</div>
            {button.text}
          </div>
        </div>
      );
    });
  };

  const createOrGetUser = async (response, addUser) => {
    const decoded = jwt_decode(response.credential);

    const { name, picture, sub } = decoded;

    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, user);
    addUser(user);
  };
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("overlay")}></div>
        <div className={cx("login")}>
          <div className={cx("main-info")}>
            <div className={cx("body")}>
              <div className={cx("content")}>
                <h3 className={cx("title")}>Log in to TikTok</h3>
                <div className={cx("google-login")}>
                  <GoogleLogin
                    width="320"
                    text="login"
                    client_id={clientId}
                    onSuccess={(response) => createOrGetUser(response, addUser)}
                    onError={() => console.log("Error")}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                  />
                </div>
                {renderButtons()}
              </div>
            </div>

            <div
              className={cx("footer")}
              style={{
                color: "rgb(22, 24, 35)",
                borderColor: "rgba(22, 24, 35, 0.12)",
              }}
            >
              <div style={{ fontSize: "1.6rem", color: "white" }}>
                Dont have an account?
              </div>
              <a
                className={cx("sign-up")}
                href="/signup"
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

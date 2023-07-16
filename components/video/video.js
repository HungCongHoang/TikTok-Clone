import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../../Pg/Home/Home.module.scss";

import Button from "../Button";
import VideoCard from "./videoCard";
import Login from "../Login";
import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useAuthStore from "../../store/authStore";

const cx = classNames.bind(styles);

function Video() {
  const [datas, setData] = useState([]);
  const [login, setLogin] = useState(false);
  const [follow, setFollow] = useState(null);

  const { userProfile } = useAuthStore();

  //console.log(datas);
  //let user = localStorage.getItem('user');
  // useEffect(() => {
  //   fetch(`https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=3`)
  //     .then((response) => response.json())
  //     .then((json) => setData(json.data))
  //     .catch((err) => console.error(err));
  // }, []);
  // useEffect(() => {
  //   fetch(`process.env.process.env.NEXT_PUBLIC_BASE_URL/api/post`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       // setData(json);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  // async function fecthDataFollow(item) {
  //   const res = await axios.get(`process.env.process.env.NEXT_PUBLIC_BASE_URL/api/${item?.userId}`);
  //   setFollow(res?.data);
  // }

  useEffect(() => {
    let userFollow = [];
    async function fecthData() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/follow`
      );
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`
      );

      setData(data);
      res?.data?.map((item) => {
        if (item?._id !== userProfile?._id) {
          userFollow.push(item);
        }
      });
      setFollow(userFollow);
    }
    fecthData();
  }, [datas?.likes?.length]);

  return (
    <>
      <div className={cx("home")}>
        {datas &&
          datas.map((data, index) => (
            <VideoCard
              key={index}
              data={data}
              user={userProfile}
              userfollows={follow}
            />
          ))}
        <Button className={cx("download-app")} rounded>
          Download App
        </Button>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
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

export default Video;

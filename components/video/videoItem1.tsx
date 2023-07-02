import { useRef, useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../../Pg/Home/Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCommentDots,
  faPause,
  faPlay,
  faShare,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
//import { Link } from "react-router-dom";
import Link from 'next/link';
import config from "../../config";

import Image from "../image/image";
import Button from "../Button";

import React from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../../store/authStore";
import axios from "axios";
import { Video } from "../../types";

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
}

const cx = classNames.bind(styles);

function VideoItem({ data, index, user }) {
  const [scroll, setScroll] = useState(0);
  const [like, setLike] = useState(0);
  const [play, setPlay] = useState(faPause);
  const [muted, setMuted] = useState(faVolumeXmark);
  const [islike, setIsLike] = useState(false);
  const [isPlay, setIsPlay] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setVideoMuted] = useState(true);
  const [Follow, setFollow] = useState("Follow");
  const [comment, setComment] = useState(0);
  const [share, setShare] = useState(0);
  const [post, setPost] = useState();

  const isLike = islike;
  const videoRef = useRef(null);
  const likeRef = useRef(null);
  const notify = () => toast("You need to Login!");
  const { userProfile } = useAuthStore();

  //if(!post) return null
  // const callbackFunction = (data) => {
  //     setUserLogin(data);
  // };;
  useEffect(() => {
    const videoElements = [...document.querySelectorAll("video")];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // @ts-ignore
          entry.target.intersectionRatio = entry.intersectionRatio;
          //console.log(entry.target.intersectionRatio)
        }

        const mostVisible = videoElements.reduce((prev, current) => {
          // @ts-ignore
          //console.log(current)
          if (current.intersectionRatio > (prev ? prev.intersectionRatio : 0)) {
            return current;
          } else {
            return prev;
          }
        });
        if (mostVisible && mostVisible.paused) {
          //mostVisible.load();
          // setPlay(faPause);
          //setIsPlay(false);
          mostVisible.currentTime = 0;
          mostVisible.play();
        }

        videoElements.forEach((item) => {
          if (item !== mostVisible && !item.paused) {
            item.pause();
            // setPlay(faPlay);
            // setIsPlay(true);
          }
        });
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
      }
    );

    videoElements.forEach((item) => {
      observer.observe(item);
    });
  }, [scroll]);

  document.onscroll = () => {
    setScroll(Math.floor(window.scrollY));
  };

  // const handelLike = async () => {
  //   if (user) {
  //     if (!isLike) {
  //       setLike((prev) => prev + 1);
  //       likeRef.current.style.color = "#ff3b5c";
  //       setIsLike(true);
  //       const document = {
  //         _type: "like",
  //         postedBy: {
  //           _type: "postedBy",
  //           _ref: userProfile?._id,
  //         },
  //         like: like,
  //       };
  //       await axios.post("http://localhost:3000/api/post", document);
  //       //router.push("/");
  //     } else {
  //       setLike((prev) => prev - 1);
  //       likeRef.current.style.color = "#000";
  //       setIsLike(false);
  //     }
  //   } else {
  //     notify();
  //   }
  // };

  const handelLike = async () => {
    if (user) {
      if (!isLike) {
        setLike((prev) => prev + 1);
        likeRef.current.style.color = "#ff3b5c";
        setIsLike(true);
        const { data } = await axios.put("http://localhost:3000/api/like", {
          userId: userProfile._id,
          postId: post?._id,
          islike,
        });

        setPost({ ...post, likes: data.likes })
      } else {
        setLike((prev) => prev - 1);
        likeRef.current.style.color = "#ebebeb";
        setIsLike(false);
      }
    } else {
      notify();
    }
  };

  const handelComment = () => {
    if (user) {
      setComment((prev) => prev + 1);
    } else {
      notify();
    }
  };

  const handleShare = () => {
    if (user) {
      setShare((prev) => prev + 1);
    } else {
      notify();
    }
  };

  const handelFollow = () => {
    if (user) {
      Follow === "Follow" ? setFollow("Following") : setFollow("Follow");
    } else {
      notify();
    }
  };

  const handelPlay = () => {
    if (isPlay) {
      videoRef.current.pause();
      setIsPlay(false);
      setPlay(faPlay);
    } else {
      videoRef.current.play();
      setIsPlay(true);
      setPlay(faPause);
    }
  };

  const handelVolume = () => {
    if (isVideoMuted) {
      setMuted(faVolumeHigh);
      setVideoMuted(false);
    } else {
      setVideoMuted(true);
      setMuted(faVolumeXmark);
    }
  };

  return (
    <div key={index} className={cx("wrapper")}>
      <Image
        key={index}
        className={cx("user-image")}
        src={data.postedBy.image}
        alt="test"
      />

      <div className={cx("main-info")}>
        <div className={cx("box-info")}>
          <div className={cx("info")}>
            <span className={cx("user-name")}>{data.postedBy.userName}</span>
            <span className={cx("nick-name")}>
              {/* {data.user.first_name + " " + data.user.last_name} */}
            </span>
            <Button
              className={cx("follow-btn")}
              type={Follow}
              small
              onClick={handelFollow}
            >
              {Follow}
            </Button>
          </div>
          <div className={cx("description")}>
            <span>{data.caption}</span>
          </div>
        </div>
        <div className={cx("user-video")}>
          <div className={cx("video-wrapper")}>
            <div
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <Link
                //to={config.routes.videoLink(data)}
                href={`/Detail/${data._id}`}
                //to={config.routes.video}
                // state={{
                //   videoDetail: true,
                //   video: data,
                //   //prevPath: location.pathname,
                // }}
              >
                <aside>
                  <video
                    to="/video"
                    ref={videoRef}
                    className={cx("video")}
                    src={data?.video?.asset?.url}
                    type="video/mp4"
                    muted={isVideoMuted}
                    loop
                  />
                </aside>
              </Link>
            </div>
            {isHover && (
              <div
                className={cx("control")}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <button className={cx("icon-play")} onClick={handelPlay}>
                  <FontAwesomeIcon icon={play} />
                </button>
                <button className={cx("icon-volume")} onClick={handelVolume}>
                  <FontAwesomeIcon icon={muted} />
                </button>
              </div>
            )}
          </div>

          <div className={cx("box-action")}>
            <div className={cx("action")}>
              <button className={cx("action-btn")} onClick={handelLike}>
                <span className={cx("like")} ref={likeRef}>
                  <FontAwesomeIcon
                    id={cx("icon1")}
                    className={cx("icon")}
                    icon={faHeart}
                  />
                </span>
              </button>
              {like > 0 ? (
                <strong className={cx("counter")}>{like}</strong>
              ) : (
                <strong className={cx("counter")}>Like</strong>
              )}
            </div>
            <div className={cx("action")}>
              <button className={cx("action-btn")} onClick={handelComment}>
                <span className={cx("comment")}>
                  <FontAwesomeIcon
                    id={cx("icon2")}
                    className={cx("icon")}
                    icon={faCommentDots}
                  />
                </span>
              </button>
              {comment > 0 ? (
                <strong className={cx("counter")}>{comment}</strong>
              ) : (
                <strong className={cx("counter")}>Comment</strong>
              )}
            </div>
            <div className={cx("action")}>
              <button className={cx("action-btn")} onClick={handleShare}>
                <span className={cx("share")}>
                  <FontAwesomeIcon
                    id={cx("icon3")}
                    className={cx("icon")}
                    icon={faShare}
                  />
                </span>
              </button>
              {share > 0 ? (
                <strong className={cx("counter")}>{share}</strong>
              ) : (
                <strong className={cx("counter")}>Share</strong>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params: { id } }: {
   params: { id: string } 
}) => {
  const { data } = await axios.get(`http://localhost:3000/api/post/${id}`);
  return {
    props: { postDetails: data },
  };
};

export default VideoItem;

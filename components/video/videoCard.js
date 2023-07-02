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
import Link from "next/link";

import Image from "../../components/image/image";
import Button from "../../components/Button";

import React from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const cx = classNames.bind(styles);

function VideoCard({ data, index, user, userfollows }) {
  const [scroll, setScroll] = useState(0);
  const [play, setPlay] = useState(faPause);
  const [muted, setMuted] = useState(faVolumeXmark);
  const [isPlay, setIsPlay] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setVideoMuted] = useState(true);
  const [userFollow, setUserFollow] = useState(null);
  const [contentFollow, setContentFollow] = useState("Follow");
  const [Follows, setFollows] = useState(userfollows);
  const [Follow, setFollow] = useState(null);
  const [share, setShare] = useState(0);
  const [post, setPost] = useState(data);
  const [likeColor, setLikeColor] = useState("");
  const [userLike, setUserLike] = useState({});

  const videoRef = useRef();
  const likeRef = useRef();
  const notify = () => toast("You need to Login!");

  let like = false;
  let follow = false;

  useEffect(() => {
    if (post?.likes?.length === 0 || !user) {
      setUserLike({});
      setLikeColor("#ebebeb");
    }
    post?.likes?.map((data) => {
      if (user && post?.likes.length > 0 && data._ref === user?._id) {
        setUserLike(data);
        setLikeColor("#ff3b5c");
      }
    });
  }, [post?.likes?.length, user]);

  useEffect(() => {
    Follows?.filter((items) => {
      items?.follows?.filter((item) => {
        if (item._ref === user?._id && items._id === data.userId) {
          setUserFollow(item);
          setContentFollow("Following");
        }
      });
      if (items._id === data.userId) {
        setFollow(items);
      }
    });
    if (user === null || user === undefined) {
      setContentFollow("Follow");
    }
  }, [user]);

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

  const handelLike = async () => {
    if (user) {
      if (userLike?._ref !== user?._id) {
        likeRef.current.style.color = "#ff3b5c";
        like = true;
        const res = await axios.put("http://localhost:3000/api/like", {
          userId: user._id,
          postId: post._id,
          like,
        });

        setPost(res.data);
      } else if (userLike === {}) {
        likeRef.current.style.color = "#ff3b5c";
        like = true;
        const res = await axios.put("http://localhost:3000/api/like", {
          userId: user._id,
          postId: post._id,
          like,
        });

        setPost(res.data);
      } else {
        likeRef.current.style.color = "#ebebeb";
        like = false;
        const res = await axios.put("http://localhost:3000/api/like", {
          userId: user._id,
          postId: post._id,
          like,
        });

        setPost(res.data);
        setUserLike({});
      }
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

  const handelFollow = async () => {
    if (user) {
      if (Follow?.follows?.length === 0 || Follow?.follows === undefined) {
        follow = true;
        const res = await axios.put("http://localhost:3000/api/follow", {
          postId: post?.postedBy?._id,
          userId: user?._id,
          follow,
        });
        setFollow({ ...Follow, follows: res.data.follows });
        setContentFollow("Following");
        setUserFollow(null);
      } else if (
        Follow?.follows?.length > 0 &&
        userFollow?._ref !== user?._id &&
        contentFollow !== "Following"
      ) {
        follow = true;
        const res = await axios.put("http://localhost:3000/api/follow", {
          postId: post?.postedBy?._id,
          userId: user?._id,
          follow,
        });
        setFollow({ ...Follow, follows: res.data.follows });
        setContentFollow("Following");
        setUserFollow(null);
      } else {
        follow = false;
        const res = await axios.put("http://localhost:3000/api/follow", {
          postId: post?.postedBy?._id,
          userId: user?._id,
          follow,
        });
        setFollow({ ...Follow, follows: res.data.follows });
        setUserFollow(null);
        setContentFollow("Follow");
      }
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
        src={data?.postedBy?.image}
        alt="test"
      />

      <div className={cx("main-info")}>
        <div className={cx("box-info")}>
          <div className={cx("info")}>
            <span className={cx("user-name")}>{data?.postedBy?.userName}</span>
            <span className={cx("nick-name")}>
              {/* {data.user.first_name + " " + data.user.last_name} */}
            </span>
            {data?.postedBy?._id !== user?._id && (
              <Button
                className={cx("follow-btn")}
                type={contentFollow}
                small
                onClick={handelFollow}
              >
                {contentFollow}
              </Button>
            )}
          </div>
          <div className={cx("description")}>
            <span>{data?.caption}</span>
          </div>
        </div>
        <div className={cx("user-video")}>
          <div className={cx("video-wrapper")}>
            <div
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <Link href={`/Detail/${data?._id}`}>
                <aside>
                  <video
                    //to="/video"
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
                <span
                  className={cx("like")}
                  ref={likeRef}
                  style={{ color: `${likeColor}` }}
                >
                  <FontAwesomeIcon
                    id={cx("icon1")}
                    className={cx("icon")}
                    icon={faHeart}
                  />
                </span>
              </button>
              {post?.likes?.length > 0 ? (
                <strong className={cx("counter")}>{post.likes.length}</strong>
              ) : (
                <strong className={cx("counter")}>Like</strong>
              )}
            </div>
            <div className={cx("action")}>
              <Link href={`/Detail/${data?._id}`}>
                <button className={cx("action-btn")}>
                  <span className={cx("comment")}>
                    <FontAwesomeIcon
                      id={cx("icon2")}
                      className={cx("icon")}
                      icon={faCommentDots}
                    />
                  </span>
                </button>
              </Link>
              {post?.comments?.length > 0 ? (
                <strong className={cx("counter")}>
                  {post.comments.length}
                </strong>
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
  );
}

export default VideoCard;

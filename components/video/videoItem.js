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

import Image1 from "../../components/image/image";
import Button from "../../components/Button";

import React from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import VideoCard from "./videoCard";

const cx = classNames.bind(styles);

function VideoItem({ data, index, user, userfollows }) {
  const [userFollow, setUserFollow] = useState(null);
  const [contentFollow, setContentFollow] = useState("Follow");
  const [Follows, setFollows] = useState(userfollows);
  const [Follow, setFollow] = useState(null);
  const [post, setPost] = useState(data);

  //console.log(user);

  useEffect(() => {
    Follows?.map((items) => {
      items?.follows?.filter((item) => {
        if (item._ref === user?._id) {
          setContentFollow("Following");
        } else {
          setContentFollow("Follow");
        }
      });
    });
  }, [user]);

  console.log(contentFollow);
  //console.log(userFollow);

  return (
    // <div key={index} className={cx("wrapper")}>
    //   <Image1
    //     key={index}
    //     className={cx("user-image")}
    //     src={data.postedBy.image}
    //     alt="test"
    //   />

    //   <div className={cx("main-info")}>
    //     <div className={cx("box-info")}>
    //       <div className={cx("info")}>
    //         <span className={cx("user-name")}>{data.postedBy.userName}</span>
    //         <span className={cx("nick-name")}>
    //           {/* {data.user.first_name + " " + data.user.last_name} */}
    //         </span>
    //         {data?.postedBy?._id !== user?._id && (
    //           <Button
    //             className={cx("follow-btn")}
    //             type={contentFollow}
    //             small
    //             onClick={handelFollow}
    //           >
    //             {contentFollow}
    //           </Button>
    //         )}
    //       </div>
    //       <div className={cx("description")}>
    //         <span>{data.caption}</span>
    //       </div>
    //     </div>
    //     <div className={cx("user-video")}>
    //       <div className={cx("video-wrapper")}>
    //         <div
    //           onMouseEnter={() => setIsHover(true)}
    //           onMouseLeave={() => setIsHover(false)}
    //         >
    //           <Link href={`/Detail/${data._id}`}>
    //             <aside>
    //               <video
    //                 //to="/video"
    //                 ref={videoRef}
    //                 className={cx("video")}
    //                 src={data?.video?.asset?.url}
    //                 type="video/mp4"
    //                 muted={isVideoMuted}
    //                 loop
    //               />
    //             </aside>
    //           </Link>
    //         </div>
    //         {isHover && (
    //           <div
    //             className={cx("control")}
    //             onMouseEnter={() => setIsHover(true)}
    //             onMouseLeave={() => setIsHover(false)}
    //           >
    //             <button className={cx("icon-play")} onClick={handelPlay}>
    //               <FontAwesomeIcon icon={play} />
    //             </button>
    //             <button className={cx("icon-volume")} onClick={handelVolume}>
    //               <FontAwesomeIcon icon={muted} />
    //             </button>
    //           </div>
    //         )}
    //       </div>

    //       <div className={cx("box-action")}>
    //         <div className={cx("action")}>
    //           <button className={cx("action-btn")} onClick={handelLike}>
    //             <span
    //               className={cx("like")}
    //               ref={likeRef}
    //               style={{ color: `${likeColor}` }}
    //             >
    //               <FontAwesomeIcon
    //                 id={cx("icon1")}
    //                 className={cx("icon")}
    //                 icon={faHeart}
    //               />
    //             </span>
    //           </button>
    //           {post?.likes?.length > 0 ? (
    //             <strong className={cx("counter")}>{post.likes.length}</strong>
    //           ) : (
    //             <strong className={cx("counter")}>Like</strong>
    //           )}
    //         </div>
    //         <div className={cx("action")}>
    //           <Link href={`/Detail/${data._id}`}>
    //             <button className={cx("action-btn")}>
    //               <span className={cx("comment")}>
    //                 <FontAwesomeIcon
    //                   id={cx("icon2")}
    //                   className={cx("icon")}
    //                   icon={faCommentDots}
    //                 />
    //               </span>
    //             </button>
    //           </Link>
    //           {post?.comments?.length > 0 ? (
    //             <strong className={cx("counter")}>
    //               {post.comments.length}
    //             </strong>
    //           ) : (
    //             <strong className={cx("counter")}>Comment</strong>
    //           )}
    //         </div>
    //         <div className={cx("action")}>
    //           <button className={cx("action-btn")} onClick={handleShare}>
    //             <span className={cx("share")}>
    //               <FontAwesomeIcon
    //                 id={cx("icon3")}
    //                 className={cx("icon")}
    //                 icon={faShare}
    //               />
    //             </span>
    //           </button>
    //           {share > 0 ? (
    //             <strong className={cx("counter")}>{share}</strong>
    //           ) : (
    //             <strong className={cx("counter")}>Share</strong>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <VideoCard
        data={data}
        user={user}
        index={index}
        content={Follows?.map((items) =>
          items?.follows?.map((item) =>
            item?._ref === user?._id ? "Following" : "Follow"
          )
        )}
      />
    </>
  );
}

export default VideoItem;

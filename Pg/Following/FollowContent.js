import { useRef } from "react";
import classNames from "classnames/bind";
import styles from "./Follow.module.scss";

const cx = classNames.bind(styles);

function FollowContent({ data }) {
  const videoRef = useRef();
  const handlePlay = () => {
    //videoRef.current.currentTime = 0;
    videoRef.current.play();
  };
  const handlePause = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };
  return (
    <div
      className={cx("wrapper")}
      onMouseEnter={handlePlay}
      onMouseLeave={handlePause}
    >
      <div className={cx("container")}>
        <div className={cx("user-card")}>
          <div className={cx("card-container")}>
            <video
              className={cx("video")}
              ref={videoRef}
              src={data.file_url}
              muted
            />
          </div>
          <div className={cx("card-info")}>
            <span className={cx("info")}>
              <img
                className={cx("avatar")}
                src={data.user.avatar}
                alt={data.user.avatar}
              />
            </span>
            <h5 className={cx("username")}>
              {data.user.first_name + " " + data.user.last_name}
            </h5>
            <h6 className={cx("nickname")}>{data.user.nickname}</h6>
            <div className={cx("follow")}>
              <button className={cx("follow-btn")}>Follow</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowContent;

import classNames from "classnames/bind";
import styles from "../../VideoDetails/VideoDetails.module.scss";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "../../../components/icons";
//import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function VideoPlayer() {
  const [play, setPlay] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const videoRef = useRef();
  const location = useLocation();
  const data = location.state.video;

  const handlePlay = () => {
    videoRef.current.pause();
    setPlay(true);
    if (play) {
      videoRef.current.play();
      setPlay(false);
    }
  };

  const handleShowControls = () => {
    setShowControls(true);
  };

  return (
    <div className={cx("video-container")}>
      <div
        className={cx("background")}
        style={{
          backgroundImage: `url(${data.thumb_url})`,
        }}
      ></div>
      <div className={cx("video-wrapper")} onClick={handlePlay}>
        <div className={cx("div-container")}>
          <img className={cx("img-bg")} src={data.thumb_url} alt="" />
          <div className={cx("basic-player")}>
            <div className={cx("video-player")}>
              <video
                ref={videoRef}
                key={data.id}
                isablePictureInPicture
                className={cx("main-video")}
                src={data.file_url}
                //type="video/mp4"
                controls={showControls}
                onMouseEnter={handleShowControls}
                muted
                controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
                loop
                autoPlay
                playsInline
              />
            </div>
          </div>
        </div>
      </div>
      <a className={cx("back")} href="/">
        <FontAwesomeIcon className={cx("icon-back")} icon={faClose} />
      </a>
      <a href="/">
        <Logo classes={cx("logo")} href="/" />
      </a>
      {play && <FontAwesomeIcon className={cx("icon-play")} icon={faPlay} />}
    </div>
  );
}

export default VideoPlayer;

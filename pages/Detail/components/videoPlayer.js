import classNames from "classnames/bind";
import styles from "../VideoDetails.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "../../../components/icons";
import { useRef, useState } from "react";
import Link from "next/link";

const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
  const [play, setPlay] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const videoRef = useRef();
  // console.log(data);
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
          backgroundImage1: `url(${data?.video.asset.url})`,
        }}
      ></div>
      <div className={cx("video-wrapper")} onClick={handlePlay}>
        <div className={cx("div-container")}>
          {/* <img className={cx("img-bg")} src="" alt="" /> */}
          <div className={cx("basic-player")}>
            <div className={cx("video-player")}>
              <video
                ref={videoRef}
                key={data?._id}
                isablepictureinpicture="true"
                className={cx("main-video")}
                src={data?.video.asset.url}
                type="video/mp4"
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
      <Link className={cx("back")} href="/">
        <FontAwesomeIcon className={cx("icon-back")} icon={faClose} />
      </Link>
      <Link href="/">
        <Logo classes={cx("logo")} />
      </Link>
      {play && <FontAwesomeIcon className={cx("icon-play")} icon={faPlay} />}
    </div>
  );
}

export default VideoPlayer;

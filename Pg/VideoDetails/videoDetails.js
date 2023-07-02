import classNames from "classnames/bind";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { Wrapper as PopperWrapper } from "../../components/Popper";
import AccountPreview from "../../components/SuggestedAccounts/AccountPreview";
import styles from "../VideoDetails/VideoDetails.module.scss";
import VideoPlayer from "./components/videoPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faHeart,
  faShare,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import {
  CodeIcon,
  ShareIcon,
  WhatsAppIcon,
  FacebookIcon1,
  TwitterIcon1,
} from "../../components/icons";

const cx = classNames.bind(styles);

function VideoDetails() {
  const location = useLocation();
  //const data = location.state.video.user;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("video")}>
        <VideoPlayer />
      </div>
      <div className={cx("content-container")}>
        <div className={cx("info-container")}>
          <div>
            <Tippy
              interactive
              delay={[800, 0]}
              offset={[40, 0]}
              placement="bottom"
              render={() => (
                <div tabIndex="-1">
                  <PopperWrapper>
                    <div>
                      <AccountPreview data={data} />
                    </div>
                  </PopperWrapper>
                </div>
              )}
            >
              <div className={cx("main-info")}>
                <img
                  className={cx("avatar")}
                  src={data.avatar}
                  alt={data.avatar}
                />
                <div className={cx("info")}>
                  <span className={cx("nick-name")}>{data.nickname}</span>
                  <br></br>
                  <span className={cx("user-name")}>
                    {data.first_name + " " + data.last_name}
                    <span style={{ margin: "0px 4px" }}>.</span>
                    <span>2 day ago</span>
                  </span>
                </div>
              </div>
            </Tippy>
          </div>
          <Button small outline className={cx("btn-follow")}>
            Follow
          </Button>
        </div>
        <div className={cx("main-content")}>
          <span className={cx("title")}>
            {location.state.video.description}
          </span>
          <h4 className={"music-wrapper"}>
            <FontAwesomeIcon className={cx("music")} icon={faMusic} />
            {location.state.video.music}
          </h4>
          <div className={cx("action")}>
            <div className={cx("button")}>
              <div className={cx("action-btn")}>
                <button className={cx("like-btn")}>
                  <span className={cx("like-icon")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  <strong className={cx("like-counter")}>
                    {location.state.video.likes_count}
                  </strong>
                </button>
                <button className={cx("comment-btn")}>
                  <span className={cx("comment-icon")}>
                    <FontAwesomeIcon icon={faCommentDots} />
                  </span>
                  <strong className={cx("comment-counter")}>
                    {location.state.video.comments_count}
                  </strong>
                </button>
              </div>
              <div className={cx("action-link")}>
                <Tippy content="Embedded" placement="top">
                  <a className={cx("code-icon")} href="/">
                    <CodeIcon />
                  </a>
                </Tippy>
                <Tippy content="Share to friends" placement="top">
                  <a className={cx("share-icon")} href="/">
                    <ShareIcon />
                  </a>
                </Tippy>
                <Tippy content="Share to Facebook" placement="top">
                  <a className={cx("fb-icon")} href="/">
                    <FacebookIcon1 />
                  </a>
                </Tippy>
                <Tippy content="Share to What'sApp" placement="top">
                  <a className={cx("whatsapp-icon")} href="/">
                    <WhatsAppIcon />
                  </a>
                </Tippy>
                <Tippy content="Share to Twitter" placement="top">
                  <a className={cx("twitter-icon")} href="/">
                    <TwitterIcon1 />
                  </a>
                </Tippy>
                <button className={cx("share-btn")}>
                  <span className={cx("share-icon")}>
                    <FontAwesomeIcon icon={faShare} />
                  </span>
                </button>
              </div>
            </div>
            <div className={cx("link")}>
              <p className={cx("video-link")}>
                {location.state.video.file_url}
              </p>
              <button className={cx("copy-link")}>Copy Link</button>
            </div>
          </div>
        </div>
        <div className={cx("comment-list")}></div>
        <div className={cx("bottom-comment")}>
          <div className={cx("comment")}>Please log in to comment</div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;

import classNames from "classnames/bind";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { Wrapper as PopperWrapper } from "../../components/Popper";
import AccountPreview from "../../components/SuggestedAccounts/AccountPreview";
import styles from "../Detail/VideoDetails.module.scss";
import VideoPlayer from "../Detail/components/videoPlayer";
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
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const cx = classNames.bind(styles);

function VideoDetails() {
  const [like, setLike] = useState(0);
  const [islike, setIsLike] = useState(false);
  const [post, setPost] = useState(postDetails);

  const isLike = islike;
  console.log(post);
  const likeRef = useRef(null);
  const notify = () => toast("You need to Login!");
  const { userProfile } = useAuthStore();
  const location = useLocation();
  console.log(location);
  const data = location.state.video;

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

        setPost({ ...post, likes: data.likes });
      } else {
        setLike((prev) => prev - 1);
        likeRef.current.style.color = "#ebebeb";
        setIsLike(false);
      }
    } else {
      notify();
    }
  };

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
                <Image
                width={40} height= {40}
                  className={cx("avatar")}
                  src={data.postedBy.image}
                  alt={data.postedBy.image}
                />
                <div className={cx("info")}>
                  <span className={cx("nick-name")}>
                    {data.postedBy.userName}
                  </span>
                  <br></br>
                  <span className={cx("user-name")}>
                    {/* {data.first_name + " " + data.last_name} */}
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
          <span className={cx("title")}>{data.caption}</span>
          <h4 className={"music-wrapper"}>
            <FontAwesomeIcon className={cx("music")} icon={faMusic} />
            {/* {location.state.video.music} */}
          </h4>
          <div className={cx("action")}>
            <div className={cx("button")}>
              <div className={cx("action-btn")}>
                <button className={cx("like-btn")} onClick={handelLike}>
                  <span className={cx("like-icon")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  <strong className={cx("like-counter")}>
                    {/* {location.state.video.likes_count} */}
                  </strong>
                </button>
                <button className={cx("comment-btn")}>
                  <span className={cx("comment-icon")}>
                    <FontAwesomeIcon icon={faCommentDots} />
                  </span>
                  <strong className={cx("comment-counter")}>
                    {/* {location.state.video.comments_count} */}
                  </strong>
                </button>
              </div>
              <div className={cx("action-link")}>
                <Tippy content="Embedded" placement="top">
                  <Link className={cx("code-icon")} href="/">
                    <CodeIcon />
                  </Link>
                </Tippy>
                <Tippy content="Share to friends" placement="top">
                  <Link className={cx("share-icon")} href="/">
                    <ShareIcon />
                  </Link>
                </Tippy>
                <Tippy content="Share to Facebook" placement="top">
                  <Link className={cx("fb-icon")} href="/">
                    <FacebookIcon1 />
                  </Link>
                </Tippy>
                <Tippy content="Share to What'sApp" placement="top">
                  <Link className={cx("whatsapp-icon")} href="/">
                    <WhatsAppIcon />
                  </Link>
                </Tippy>
                <Tippy content="Share to Twitter" placement="top">
                  <Link className={cx("twitter-icon")} href="/">
                    <TwitterIcon1 />
                  </Link>
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
                {/* {location.state.video.file_url} */}
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

export const getServerSideProps = async ({ params: { id } }) => {
  const { data } = await axios.get(`http://localhost:3000/api/post/${id}`);
  return {
    props: { postDetails: data },
  };
};

export default VideoDetails;

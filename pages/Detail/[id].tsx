import classNames from "classnames/bind";
import Button from "../../components/Button";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// import { Wrapper as PopperWrapper } from "../../components/Popper";
// import AccountPreview from "../../components/SuggestedAccounts/AccountPreview";
import styles from "../Detail/VideoDetails.module.scss";
import VideoPlayer from "./components/videoPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faHeart,
  faShare,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import {
  CodeIcon ,
  ShareIcon,
  WhatsAppIcon,
  FacebookIcon1,
  TwitterIcon1,
} from "../../components/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import axios from "axios";
import { IUser, Video } from "../../types";
import Comment from "./components/Comment"

const cx = classNames.bind(styles);

interface IProps {
  postDetails: Video;
  follows: IUser
}

function Detail({ postDetails, follows }: IProps) {
  const [post, setPost] = useState(postDetails);
  const [likeColor, setLikeColor] = useState("#ebebeb");
  const [userLike, setUserLike] = useState(null);
  const [userComment, setUserComment] = useState(null);
  const [contentFollow, setContentFollow] = useState("Follow");
  const [Follows, setFollows] = useState(follows);
  const [Follow, setFollow] = useState(null);
  const [userFollow, setUserFollow] = useState(null);

  const likeRef = useRef(null);
  const commentRef = useRef(null)
  const notify = () => toast("You need to Login!");
  const { userProfile } = useAuthStore();

  useEffect (() => {
    post?.likes?.map(
      (item : any) => {
        if (item._ref === userProfile?._id) {
          setUserLike(item)
        }
      } 
    );
  },[post?.likes.length, userProfile])

  useEffect(() => {
    Follows?.filter((items : any) => {
      items?.follows?.filter((item : any) => {
        if (item._ref === userProfile?._id  && items._id === post?.userId) {
          setUserFollow(item);
          setContentFollow("Following");
        }
      });
      if (items._id === post.userId) {
        setFollow(items);
      }
    });
    if (userProfile === null || userProfile === undefined) {
      setContentFollow("Follow");
    }
  }, [userProfile]);
  

  let like = false;
  let follow = false;

  useEffect(() => {
    if (post?.likes.length > 0 && userLike?._ref === userProfile?._id && userProfile !== null ) {
      setLikeColor("#ff3b5c");
    } else {
      setLikeColor("#ebebeb");
    }
  }, [userProfile]);

  const handelLike = async () => {
    if (userProfile) {
      if (userLike?._ref !== userProfile?._id) {
        likeRef.current.style.color = "#ff3b5c";
        like = true;
        const res = await axios.put("http://localhost:3000/api/like", {
          userId: userProfile._id,
          postId: post._id,
          like,
        });

        setPost({ ...post, likes: res.data.likes });
      } else if (post?.likes.length === 0) {
        likeRef.current.style.color = "#ff3b5c";
        like = true;
        const res = await axios.put("http://localhost:3000/api/like", {
          userId: userProfile._id,
          postId: post._id,
          like,
        });

        setPost({ ...post, likes: res.data.likes });

      } else {
        likeRef.current.style.color = "#ebebeb";
        like = false
        const res = await axios.put("http://localhost:3000/api/like", {
          userId: userProfile._id,
          postId: post._id,
          like,
        });

        setPost({ ...post, likes: res.data.likes });
        setUserLike(null)
      }
    } else {
      notify();
    }
  };
  const handleComment =async (e : any) => {
    let res = null;
    if (e.keyCode === 13 && e.type === "keyup") {
      res = await axios.put(`http://localhost:3000/api/post/${post._id}`, {
        comment: userComment,
        userId: userProfile._id,
      });
      setUserComment("");
      setPost({ ...post, comments: res?.data?.comments })
      commentRef.current.focus();
    }
    else if (e.type === "click") {
      res = await axios.put(`http://localhost:3000/api/post/${post._id}`, {
        comment: userComment,
        userId: userProfile._id,
      });
      setUserComment("");
      setPost({ ...post, comments: res?.data?.comments })
      commentRef.current.focus();
    }
  }
  
  const handelFollow = async () => {
    if (userProfile) {
      if (Follow?.follows?.length === 0) {
        follow = true;
        const res = await axios.put("http://localhost:3000/api/follow", {
          postId: post?.postedBy?._id,
          userId: userProfile?._id,
          follow,
        });
        setFollow({ ...Follow, follows:res.data.follows })
        setContentFollow("Following")
        setUserFollow(null);
      } else if (
        Follow?.follows?.length > 0 &&
        userFollow?._ref !== userProfile?._id &&
        contentFollow !== "Following"
      ) {
        follow = true;
        const res = await axios.put("http://localhost:3000/api/follow", {
          postId: post?.postedBy?._id,
          userId: userProfile?._id,
          follow,
        });
        setFollow({ ...Follow, follows: res.data.follows });
        setContentFollow("Following");
        setUserFollow(null);
      }else {
        follow = false;
        const res = await axios.put("http://localhost:3000/api/follow", {
          postId: post?.postedBy?._id,
          userId: userProfile?._id,
          follow,
        });
        setContentFollow("Follow");
        setFollow({ ...Follow, follows:res.data.follows })
        setUserFollow(null)
      }
    } else {
      notify();
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("video")}>
        <VideoPlayer data={post} />
      </div>
      <div className={cx("content-container")}>
        <div className={cx("info-container")}>
          <div className={cx("main-info")}>
            <img
              className={cx("avatar")}
              src={post?.postedBy.image}
              alt={post?.postedBy.image}
            />
            <div className={cx("info")}>
              <span className={cx("nick-name")}>
                {post?.postedBy.userName}
              </span>
              <br></br>
              <span className={cx("user-name")}>
                {/* {post.first_name + " " + post.last_name}
                <span style={{ margin: "0px 4px" }}>.</span> */}
                <span>2 day ago</span>
              </span>
            </div>
          </div>
          {/* <Tippy
            interactive
            delay={[800, 0]}
            offset={[40, 0]}
            placement="bottom"
            render={() => (
              <div tabIndex= {-1}>
                <PopperWrapper>
                  <div>
                    <AccountPreview data={post} />
                  </div>
                </PopperWrapper>
              </div>
            )}
          >
            <div className={cx("main-info")}>
              <img
                className={cx("avatar")}
                src={post.postedBy.image}
                alt={post.postedBy.image}
              />
              <div className={cx("info")}>
                <span className={cx("nick-name")}>
                  {post.postedBy.userName}
                </span>
                <br></br>
                <span className={cx("user-name")}>
                  {post.first_name + " " + post.last_name}
                  <span style={{ margin: "0px 4px" }}>.</span>
                  <span>2 day ago</span>
                </span>
              </div>
            </div>
          </Tippy> */}
          {post?.postedBy?._id !== userProfile?._id && (
            <Button small outline className={cx("btn-follow")} onClick={handelFollow} type={contentFollow}>
              {contentFollow}
            </Button>
          )}
        </div>
        <div className={cx("main-content")}>
          <span className={cx("title")}>{post?.caption}</span>
          <h4 className={"music-wrapper"}>
            <FontAwesomeIcon className={cx("music")} icon={faMusic} />
            {/* {location.state.video.music} */}
          </h4>
          <div className={cx("action")}>
            <div className={cx("button")}>
              <div className={cx("action-btn")}>
                <button
                  className={cx("like-btn")}
                  onClick={handelLike}
                >
                  <span
                    className={cx("like-icon")}
                    ref={likeRef}
                    style={{ color: `${likeColor}` }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  <strong className={cx("like-counter")}>
                    {post?.likes?.length | 0}
                  </strong>
                </button>
                <button className={cx("comment-btn")}>
                  <span className={cx("comment-icon")}>
                    <FontAwesomeIcon icon={faCommentDots} />
                  </span>
                  <strong className={cx("comment-counter")}>
                    {/* {location.state.video.comments_count} */}
                    {post?.comments?.length | 0}
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
                {/* {location.state.video.file_url} */}
              </p>
              <button className={cx("copy-link")}>Copy Link</button>
            </div>
          </div>
        </div>
        <div className={cx("comment-list")}>
          {post?.comments?.length > 0 && 
            post.comments.map((item: any, index: any) => (
              <Comment data={item} index={index} />
            ))}
        </div>
        <div className={cx("wrapper-comment")}>
          <div className={cx("bottom-comment")}>
            {!userProfile ? <div className={cx("comment")}>Please log in to comment</div> :  
              <input 
                className={cx("comment")} 
                value={userComment}
                ref={commentRef}
                placeholder="Add Comment.." 
                onKeyUp={(e) => handleComment(e)}
                onChange={e => setUserComment(e.target.value)}></input>}           
          </div>
          <div className={cx("post")} onClick={handleComment}>Post</div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params: { id } }) => {
  const res = await axios.get(`http://localhost:3000/api/post/${id}`);
  const { data } = await axios.get(`http://localhost:3000/api/follow`);
  return {
    props: { postDetails: res.data, follows: data },
  };
};


export default Detail;

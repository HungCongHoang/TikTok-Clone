import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./Upload.module.scss";
import { client } from "../utils/client";
import axios from "axios";
import { Headeronly } from "layouts";
import { useRouter } from "next/router";
import useAuthStore from "../store/authStore";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
const cx = classNames.bind(styles);

function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState(null);
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const topics = ["Followers", "Friends", "Private"];
  const [topic, setTopic] = useState(topics[0]);
  const router = useRouter();

  const { userProfile } = useAuthStore();

  const notify = () => toast("You need to Login!");

  const uploadVideo = async (e) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };
  // const handleuploadVideo = async (e) => {
  //   var reader = new FileReader();
  //   // console.log(e.target.files[0]);
  //   // console.log(reader);
  //   var url = URL.createObjectURL(e.target.files[0]);
  //   setVideoAsset(url);
  //   await axios.get(`process.env.NEXT_PUBLIC_BASE_URL/api/post`, e.target.files[0]);
  //   router.push("/");
  // };
  const handleuploadVideo = async () => {
    if (userProfile) {
      if (videoAsset && caption) {
        const document = {
          _type: "post",
          caption: caption,
          video: {
            _type: "file",
            asset: {
              _type: "reference",
              _ref: videoAsset?._id,
            },
          },
          userId: userProfile?._id,
          postedBy: {
            _type: "postedBy",
            _ref: userProfile?._id,
          },
          topic: topic,
        };
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`,
          document
        );
        window.location = "/";
      }
    } else {
      notify();
    }
  };

  return (
    <>
      <div className={cx("layout")}>
        <div className={cx("title")}>
          <span className={cx("post-title")}>Upload video</span>
          <span className={cx("sub-title")}>Post a video to your account</span>
        </div>
        <div className={cx("container")}>
          {/* <div className={cx("uploader")}>
            {isLoading ? (
              <p>Loading...</p>
            ) : videoAsset ? (
              <div>
                <video
                  src={videoAsset}
                  autoPlay
                  loop
                  controls
                  style={{
                    height: "100%",
                    width: "50%",
                  }}
                ></video>
              </div>
            ) : (
              <div className={cx("upload")}>
                <input
                  type="file"
                  name="upload-video"
                  className={cx("upload-video")}
                  onChange={uploadVideo}
                />
                <div className={cx("upload-card")}>
                  <img
                    src="//lf16-tiktok-common.ibytedtos.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                    alt=""
                    className={cx("icon-cloud")}
                  />
                  <div className={cx("text-main")}>
                    <span className={cx("text")}>Select video to upload</span>
                  </div>
                  <div>
                    <span className={cx("text1")}>Or drag and drop a file</span>
                  </div>
                  <div className={cx("text-sub")}>
                    <span className={cx("text1")}>
                      Long videos can be split into multiple parts to get more
                      exposure
                    </span>
                  </div>
                  <div className={cx("text-video-info")}>
                    <div className={cx("info")}>
                      <span className={cx("text1")}>MP4 or WebM</span>
                    </div>
                    <div className={cx("info")}>
                      <span className={cx("text1")}>
                        720x1280 resolution or higher
                      </span>
                    </div>
                    <div className={cx("info")}>
                      <span className={cx("text1")}>Up to 30 minutes</span>
                    </div>
                    <div className={cx("info")}>
                      <span className={cx("text1")}>Less than 2 GB</span>
                    </div>
                  </div>
                  <div className={cx("select-button")}>
                    <button className={cx("button")}>
                      <div className={cx("text-button")}>
                        <span className={cx("text-select")}>Select file</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div> */}
          <div className={cx("uploader")}>
            {videoAsset && (
              <div className={cx("upload")}>
                <video
                  src={videoAsset.url}
                  autoPlay
                  loop
                  controls
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                ></video>
              </div>
            )}
            <input
              type="file"
              name="upload-video"
              className={cx("upload-video")}
              onChange={uploadVideo}
            />
            <div className={cx("upload-card")}>
              <Image
                width={40}
                height={40}
                src="//lf16-tiktok-common.ibytedtos.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                alt=""
                className={cx("icon-cloud")}
              />
              <div className={cx("text-main")}>
                <span className={cx("text")}>Select video to upload</span>
              </div>
              <div>
                <span className={cx("text1")}>Or drag and drop a file</span>
              </div>
              <div className={cx("text-sub")}>
                <span className={cx("text1")}>
                  Long videos can be split into multiple parts to get more
                  exposure
                </span>
              </div>
              <div className={cx("text-video-info")}>
                <div className={cx("info")}>
                  <span className={cx("text1")}>MP4 or WebM</span>
                </div>
                <div className={cx("info")}>
                  <span className={cx("text1")}>
                    720x1280 resolution or higher
                  </span>
                </div>
                <div className={cx("info")}>
                  <span className={cx("text1")}>Up to 30 minutes</span>
                </div>
                <div className={cx("info")}>
                  <span className={cx("text1")}>Less than 2 GB</span>
                </div>
              </div>
              <div className={cx("select-button")}>
                <button className={cx("button")}>
                  <div className={cx("text-button")}>
                    <span className={cx("text-select")}>Select file</span>
                  </div>
                </button>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className={cx("form")}>
            <div className={cx("caption")}>
              <span style={{ color: "black" }}>Caption</span>
              <input
                value={caption}
                className={cx("input")}
                onChange={(e) => setCaption(e.target.value)}
              ></input>
            </div>
            <div className={cx("topic")}>
              <span style={{ color: "black" }}>Choose a topic</span>
              <select
                className={cx("input")}
                onChange={(e) => setTopic(e.target.value)}
              >
                {topics.map((topic, index) => (
                  <option key={index}>{topic}</option>
                ))}
              </select>
            </div>
            <div className={cx("action")}>
              <div className={cx("action-discard")}>
                <button className={cx("discard")}>
                  <div>
                    <span className={cx("text-discard")}>Discard</span>
                  </div>
                </button>
              </div>
              <div className={cx("action-post")}>
                <button className={cx("post")} onClick={handleuploadVideo}>
                  <div className={cx("text-post")}>
                    <span className={cx("text-postFile")}>Post</span>
                  </div>
                </button>
              </div>
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
      <div className={cx("footer")}>
        <div className={cx("footer-container")}>
          <footer className={cx("content-wrapper")}>
            <div className={cx("logo")}>
              <Image
                width={40}
                height={40}
                src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logo-7328701c910ebbccb5670085d243fc12.svg"
                alt=""
                style={{
                  width: "33px",
                }}
              />
              <Image
                width={40}
                height={40}
                src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logotext-9b4d14640f93065ec36dab71c806e135.svg"
                alt=""
                style={{
                  width: "120px",
                  marginLeft: "6px",
                  position: "relative",
                  top: "-2px",
                }}
              />
            </div>
          </footer>
          <div className={cx("bottom-wrapper")}>
            <div className={cx("copyright")}>© 2023 TikTok</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Upload;

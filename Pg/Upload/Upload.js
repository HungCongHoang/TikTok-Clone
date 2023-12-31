import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./Upload.module.scss";
import { client } from "../../utils/client";
import axios from "axios";
import { useRouter } from "next/router";
import useAuthStore from "store/authStore";
import { Location } from "react-router-dom";
const cx = classNames.bind(styles);

function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const router = useRouter();

  const { userProfile } = useAuthStore();

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
          console.log(data);
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };
  const handleuploadVideo = async () => {
    if (videoAsset?._id) {
      const document = {
        _type: "post",
        caption: "videotest",
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
        //postedBy: userProfile?.userName,
        topic: "video",
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`,
        document
      );
      //router.push("process.env.NEXT_PUBLIC_BASE_URL");
      //setSavingPost(true);
      //router.reload();
      window.location = "/";
    }
  };

  return (
    <>
      <div className={cx("layout")}>
        <div className={cx("container")}>
          <div className={cx("uploader")}>
            {isLoading ? (
              <p>Loading...</p>
            ) : videoAsset ? (
              <div>
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
          </div>
        </div>
      </div>
      <button className={cx("post")} onClick={handleuploadVideo}>
        <div className={cx("text-post")}>
          <span className={cx("text-postFile")}>Post</span>
        </div>
      </button>
      <div className={cx("footer")}>
        <div className={cx("footer-container")}>
          <footer className={cx("content-wrapper")}>
            <div className={cx("logo")}>
              <img
                src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logo-7328701c910ebbccb5670085d243fc12.svg"
                alt=""
                style={{
                  width: "33px",
                }}
              />
              <img
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

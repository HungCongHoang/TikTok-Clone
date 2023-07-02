import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Button from "../../../components/Button";
import styles from "./AccountPreview.module.scss";

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
  const [Follow, setFollow] = useState("Follow");

  const handelFollow = () => {
    Follow === "Follow" ? setFollow("Following") : setFollow("Follow");
  };
  return (
    <div className={cx("wrapper")}>
      <header className={cx("header")}>
        <img
          className={cx("avatar")}
          src={data?.postedBy?.image || data?.image}
          alt=""
        />
        <Button
          className={cx("follow-btn")}
          typeSideBar={Follow}
          onClick={handelFollow}
        >
          {Follow}
        </Button>
      </header>
      <div className={cx("body")}>
        <p className={cx("nickname")}>
          {/* <strong>{data.first_name + " " + data.last_name}</strong> */}
          <strong>{data?.postedBy?.userName || data?.userName}</strong>
          {data.tick && (
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
          )}
        </p>
        {/* <p className={cx("name")}>{data.nickname}</p> */}
        <p className={cx("analytics")}>
          <strong className={cx("value")}>{data?.follows?.length | 0} </strong>
          <span className={cx("label")}>Followers</span>
          <strong className={cx("value")}>{data?.likes?.length} </strong>
          <span className={cx("label")}>Likes</span>
        </p>
      </div>
    </div>
  );
}

export default AccountPreview;

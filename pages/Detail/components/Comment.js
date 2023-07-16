import styles from "../VideoDetails.module.scss";
import classNames from "classnames/bind";
import useAuthStore from "../../../store/authStore";
import { useEffect } from "react";
import Image from "next/image";

const cx = classNames.bind(styles);

function Comment({ data, index }) {
  const { allUsers, fetchAllUsers } = useAuthStore();
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);
  return (
    <>
      {allUsers?.map(
        (user, index) =>
          user._id === (data.postedBy._ref || data.postedBy._id) && (
            <div key={index} className={cx("main")}>
              <Image
                className={cx("avatar-comment")}
                src={user.image}
                alt={user.image}
              />
              <div className={cx("main-info-comment")}>
                <div className={cx("info")}>
                  <span className={cx("nick-name-comment")}>
                    {user.userName}
                  </span>
                </div>
                <span className={cx("content-comment")}>{data.comment}</span>
              </div>
            </div>
          )
      )}
    </>
  );
}

export default Comment;

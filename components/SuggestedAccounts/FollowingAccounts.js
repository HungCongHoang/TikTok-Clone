import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./SuggestedAccounts.module.scss";
import AccountItem from "./AccountItem";
import useAuthStore from "../../store/authStore";

const cx = classNames.bind(styles);

function FollowingAccounts({ label }) {
  const [item, setItem] = useState([]);
  const [follow, setFollow] = useState([]);
  const [data, setData] = useState([]);
  const [seeAll, setSeeAll] = useState(false);

  const { userProfile } = useAuthStore();

  useEffect(() => {
    let follows = [];
    if (seeAll) {
      // fetch(
      //   "https://tiktok.fullstack.edu.vn/api/users/suggested?page=2&per_page=16"
      // )
      //   .then((response) => response.json())
      //   .then((json) => setItem(json.data));
    } else {
      // fetch(
      //   "https://tiktok.fullstack.edu.vn/api/users/suggested?page=2&per_page=1"
      // )
      fetch(`${process.env.process.env.NEXT_PUBLIC_BASE_URL}/api/follow`)
        .then((response) => response.json())
        .then((json) => setItem(json));
      fetch(`${process.env.process.env.NEXT_PUBLIC_BASE_URL}/api/post`)
        .then((response) => response.json())
        .then((json) => setFollow(json));
    }
    item.map((datas) => {
      if (datas?._id !== userProfile?._id) {
        datas?.follows?.filter((data) => {
          if (data?._ref === userProfile?._id) {
            follows.push(datas);
          }
        });
      }
    });
    setData(follows);
  }, [seeAll]);

  const handleLoadMore = () => {
    setSeeAll((prev) => !prev);
  };

  return (
    <div className={cx("wrapper")}>
      <p className={cx("label")}>{label}</p>
      <AccountItem item={data} />
      <p className={cx("more-btn")} onClick={handleLoadMore}>
        {seeAll ? "Hide" : "See all"}
      </p>
    </div>
  );
}

FollowingAccounts.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FollowingAccounts;

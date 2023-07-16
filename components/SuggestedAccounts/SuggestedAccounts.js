import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./SuggestedAccounts.module.scss";
import AccountItem from "./AccountItem";

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, currentUser }) {
  const [item, setItem] = useState([]);
  const [seeAll, setSeeAll] = useState(false);

  useEffect(() => {
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
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`)
        .then((response) => response.json())
        .then((json) => setItem(json));
    }

    return;
  }, [seeAll]);

  const handleLoadMore = () => {
    setSeeAll((prev) => !prev);
  };

  return (
    <div className={cx("wrapper")}>
      <p className={cx("label")}>{label}</p>
      <AccountItem item={item} />
      <p className={cx("more-btn")} onClick={handleLoadMore}>
        {seeAll ? "Hide" : "See all"}
      </p>
    </div>
  );
}

SuggestedAccounts.propTypes = {
  label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;

import PropTypes from "prop-types";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./SuggestedAccounts.module.scss";
import config from "config";
import Image from "next/image";

const cx = classNames.bind(styles);

function SuggestedAccountItem({ data }) {
  return (
    //to={`/@${data.nickname}`}
    <Link
      to={config.routes.profileLink(data)}
      state={{
        profile: data,
        //prevPath: location.pathname
      }}
      className={cx("account-item")}
    >
      <Image
        className={cx("avatar")}
        src={data?.postedBy?.image || data?.image}
        alt={data?.postedBy?.image || data?.image}
      />
      <div className={cx("item-info")}>
        <p className={cx("nickname")}>
          {/* <strong>{data.first_name + " " + data.last_name}</strong> */}
          <span>{data?.postedBy?.userName || data?.userName}</span>
          {data.tick && (
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
          )}
        </p>
        {/* <p className={cx("name")}>{data.nickname}</p> */}
      </div>
    </Link>
  );
}

SuggestedAccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SuggestedAccountItem;

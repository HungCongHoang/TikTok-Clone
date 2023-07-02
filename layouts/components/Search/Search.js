"use client";
import { useEffect, useState } from "react";
import { useRef } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";

import { Wrapper as PopperWrapper } from "../../../components/Popper";
import AccountItem from "../../../components/AccountItems";
import { SearchIcon } from "../../../components/icons/icons";
import { useDebounce } from "../../../hooks";
import * as searchServices from "../../../services/searchService";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchresult, setSearchresult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchresult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await searchServices.search(debouncedValue);
      setSearchresult(result);

      setLoading(false);
    };

    fetchApi();
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue("");
    setSearchresult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  return (
    //Using a wrapper <div> or <span> tag around the reference element
    //solves this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchresult?.length > 0}
        render={(attr) => (
          <div className={cx("search-result")} tabIndex="-1" {...attr}>
            <PopperWrapper>
              <h4 className={cx("search-title")}>Accounts</h4>
              {searchresult?.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search accounts and videos"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}

          <HeadlessTippy content="Tìm kiếm">
            <button
              className={cx("search-btn")}
              onMouseDown={(e) => e.preventDefault()}
            >
              <SearchIcon />
            </button>
          </HeadlessTippy>
          {/* <div className={cx('borderSearch')}></div> */}
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;

import { useState, useEffect } from "react";

import FollowContent from "./FollowContent";

function Following() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=3`)
      .then((response) => response.json())
      .then((json) => setData(json.data));
  }, []);
  return (
    <div
      style={{
        width: "800px",
        maxWidth: "800px",
        position: "relative",
        padding: "44px 0px",
        flexShrink: "0",
      }}
    >
      {data.length > 0 &&
        data.map((data, index) => <FollowContent data={data} key={index} />)}
    </div>
  );
}

export default Following;

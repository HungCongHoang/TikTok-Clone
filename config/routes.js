const routes = {
  home: "/",
  video: "/Detail/:id",
  // videoLink: (content) =>
  //   `/@${content.postedBy.userName}/videos/${content._id}`,
  videoLink: (content) => `/Detail/${content._id}`,
  following: "/following",
  profile: "/@:nickname",
  profileLink: (data) => `/@${data.nickname}`,
  upload: "/Upload",
  search: "/search",
  live: "/live",
};

export default routes;

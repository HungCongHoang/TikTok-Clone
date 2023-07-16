//Layout
import { Headeronly } from "../layouts";
// routes
import config from "../config";

//Pages
import Home from "../Pg/Home";
import Following from "../Pg/Following";
import Profile from "../Pg/Profile";
//import Upload from "../Pg/Upload";
import Upload from "../pages/Upload";
import Search from "../Pg/Search";
import Live from "../Pg/Live";

//Video Detail
// import Video from "../Pg/VideoDetails";
// import VideoDetails from "../pages/Detail/videoDetails";

// Public Routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  // { path: config.routes.video, component: VideoDetails },
  { path: config.routes.following, component: Following },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.live, component: Live },
  { path: config.routes.upload, component: Upload, layout: Headeronly },
  //{ path: config.routes.search, component: Search, layout: null },
  { path: config.routes.search, component: Search },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

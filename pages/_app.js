//import "@/styles/globals.css";
import "../styles/GlobalStyles.scss";
import { useEffect, useState } from "react";

const App = ({ Component, pageProps }) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return <Component {...pageProps} />;
};
export default App;

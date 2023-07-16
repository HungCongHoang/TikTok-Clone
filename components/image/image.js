import PropTypes from "prop-types";
import { useState, forwardRef } from "react";
import classNames from "classnames";
import images from "../../assets/images";
import styles from "./image.module.scss";
import Image from "next/image";

// eslint-disable-next-line react/display-name
const Image1 = forwardRef(
  (
    {
      src,
      width,
      height,
      alt,
      className,
      fallback: customFallback = images.noImage1,
      ...props
    },
    ref
  ) => {
    const [fallback, setFallback] = useState("");

    const handleError = () => {
      setFallback(customFallback);
    };

    return (
      <Image
        className={classNames(styles.wrapper, className)}
        ref={ref}
        width={width}
        height={height}
        src={fallback || src}
        {...props}
        alt={alt}
        onError={handleError}
      />
    );
  }
);

Image1.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  className: PropTypes.string,
  fallback: PropTypes.string,
};

export default Image1;

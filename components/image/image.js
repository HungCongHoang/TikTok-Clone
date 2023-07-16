import PropTypes from "prop-types";
import { useState, forwardRef } from "react";
import classNames from "classnames";
import images from "../../assets/images";
import styles from "./image.module.scss";
import Image from "next/image";

const Image = forwardRef(
  (
    {
      src,
      alt,
      className,
      fallback: customFallback = images.noImage,
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
        src={fallback || src}
        {...props}
        alt={alt}
        onError={handleError}
      />
    );
  }
);

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string,
};

export default Image;

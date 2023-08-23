import logo128 from "../components/atoms/logo128.png"
import logo512 from "../components/atoms/logo512.png"

export const preloadImages = () => {
  // add any images to preload above fold here
  const images = [logo128, logo512];

  return images.map((image) => {
    const img = new Image();
    img.src = image;
    return img;
  });
};

import { useState, useEffect, useRef } from "react";

export const useFitText = () => {
  const [fontSize, setFontSize] = useState(16);
  const ref = useRef();

  useEffect(() => {
    const handleResize = () => {
      const element = ref.current;
      if (element) {
        const parentWidth = element.parentElement.offsetWidth;
        let currentFontSize = fontSize;
        element.style.fontSize = `${currentFontSize}px`;
        while (element.scrollWidth > parentWidth && currentFontSize > 8) {
          currentFontSize -= 1;
          element.style.fontSize = `${currentFontSize}px`;
        }

        setFontSize(currentFontSize);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [fontSize]);

  return { ref, fontSize };
};

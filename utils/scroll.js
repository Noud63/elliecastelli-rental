import React, { useState, useEffect } from "react";

const scroll = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
    const offset = window.scrollY;
    offset > 30 ? setScrolled(true) : setScrolled(false);
  }
}

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrolled;
};

export default scroll;

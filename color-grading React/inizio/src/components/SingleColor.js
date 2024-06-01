import React, { useState, useEffect } from "react";
import { rgbToHex } from "../utils/Helpers";

const SingleColor = ({ rgb, type, weight }) => {
  const [message, setMessage] = useState(false)
  const copiaColore = () => {
    navigator.clipboard.writeText(rgbToHex(...rgb))
      .then(() => setMessage(true))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(false);
    }, 2000)

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <article
      onClick={copiaColore}
      className={`single-color ${type}`}
      style={{ backgroundColor: rgbToHex(...rgb) }}
    >
      {" "}
      {rgbToHex(...rgb)}
      {message && <p>Colore Copiato</p>}
    </article>
  );
};

export default SingleColor;

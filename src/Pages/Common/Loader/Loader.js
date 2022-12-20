import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Loader = () => {
  //set loader
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return (
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={160}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;

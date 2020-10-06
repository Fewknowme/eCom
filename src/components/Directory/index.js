import React from "react";
import Cplus from "./../../assets/Cpl.jpg";
import java from "./../../assets/java.jpg";
import rec from "./../../assets/React.jpg";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${Cplus})`,
          }}
        >
          <a>C++</a>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${java})`,
          }}
        >
          <a>java</a>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${rec})`,
          }}
        >
          <a>React</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;

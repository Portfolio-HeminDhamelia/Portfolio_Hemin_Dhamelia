import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const splitWord = (word: string) => 
  word.split("").map((char, index) => (
    <span key={index} style={{ display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>{splitWord("Hello! I'm")}</h2>
            <h1>
              {splitWord("HEMIN")}
              <br />
              {splitWord("DHAMELIA")}
            </h1>
          </div>
          <div className="landing-info">
            <h3>{splitWord("A Creative")}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{splitWord("Designer")}</div>
              <div className="landing-h2-2">{splitWord("Developer")}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{splitWord("Developer")}</div>
              <div className="landing-h2-info-1">{splitWord("Designer")}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;

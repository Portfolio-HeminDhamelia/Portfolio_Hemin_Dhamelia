import { PropsWithChildren, useEffect, useState } from "react";
import "./styles/Landing.css";
import { supabase } from "../lib/supabaseClient";

const Landing = ({ children }: PropsWithChildren) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const fetchAndIncrement = async () => {
      const { data, error } = await supabase.rpc("increment_visitor_count");
      if (error) {
        console.error("Visitor counter error:", error);
        return;
      }
      const finalCount: number = data as number;
      // Animate from 0 to finalCount
      const duration = 1500; // ms
      const steps = Math.min(finalCount, 60);
      const interval = duration / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += Math.ceil(finalCount / steps);
        if (current >= finalCount) {
          setDisplayCount(finalCount);
          clearInterval(timer);
        } else {
          setDisplayCount(current);
        }
      }, interval);
    };

    fetchAndIncrement();
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>
              Hello! Visitor <span className="visitor-number" style={{ color: "#ffffff" }}>{displayCount > 0 ? displayCount : "__"}</span>,
            </h2>
            <h2>I am</h2>
            <h1>
              Hemin
              <br />
              Dhamelia
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <span>Developer</span>
              <span style={{ color: "#c481ff" }}>&</span>
              <span>Engineer</span>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;

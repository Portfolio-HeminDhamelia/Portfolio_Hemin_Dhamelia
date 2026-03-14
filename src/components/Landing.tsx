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
            <h2>Hello! I'm</h2>
            <h1>
              HEMIN
              <br />
              DHAMELIA
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              Developer & Engineer
            </h2>
          </div>
        </div>
        {displayCount > 0 && (
          <div className="visitor-counter">
            <span className="visitor-counter-number">{displayCount.toLocaleString()}</span>
            <span className="visitor-counter-label">visitors</span>
          </div>
        )}
        {children}
      </div>
    </>
  );
};

export default Landing;

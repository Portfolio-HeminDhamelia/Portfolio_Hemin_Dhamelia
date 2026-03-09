import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              title: "HireReady",
              category: "Full Stack / AI",
              tools: "React, FastAPI, PostgreSQL, Supabase, GPT-4o, JWT",
              link: "https://github.com/HireReady-Team-2/HireReady",
              images: [
                "/images/hireready-ready-to-practice.png",
                "/images/hireready-active-session.png",
                "/images/hireready-interview-history.png",
                "/images/hireready-login.png"
              ]
            },
            {
              title: "Cloud-Native Web App",
              category: "Cloud / DevOps",
              tools: "Node.js, Express, PostgreSQL RDS, GitHub Actions, AWS",
              link: "https://github.com/orgs/HeminDhameliaOrg/repositories"
            },
            {
              title: "Multi-Account AWS Infrastructure",
              category: "Cloud Infrastructure",
              tools: "Terraform, AWS, SNS, Lambda, KMS, IAM, SendGrid",
              link: "https://github.com/orgs/HeminDhameliaOrg/repositories",
              images: [
                "/images/aws-1.png",
                "/images/aws-2.png",
                "/images/aws-3.png",
                "/images/aws-4.png"
              ]
            },
            {
              title: "Serverless AWS Lambda Platform",
              category: "Cloud / Serverless",
              tools: "AWS Lambda, API Gateway, S3, DynamoDB, GitHub Actions",
              link: "https://github.com/orgs/HeminDhameliaOrg/repositories",
              images: [
                "/images/aws-1.png",
                "/images/aws-2.png",
                "/images/aws-3.png",
                "/images/aws-4.png"
              ]
            },
            {
              title: "Personal Portfolio Website",
              category: "Frontend / Full Stack",
              tools: "React, TypeScript, Three.js, GSAP, Supabase, Clerk, Vercel",
              link: "https://github.com/Portfolio-HeminDhamelia/Portfolio_Hemin_Dhamelia"
            },
            {
              title: "IaC Infrastructure Platform",
              category: "Cloud / Security",
              tools: "Terraform, AWS, KMS, IAM, CloudFormation, SOC2",
              link: "https://github.com/Hemin-Dhamelia"
            }
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <a href={project.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h4>{project.title}</h4>
                    </a>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.images || "/images/placeholder.webp"} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

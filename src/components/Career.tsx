import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Teaching Assistant — Software Quality Control & Management</h4>
                <h5>Northeastern University</h5>
              </div>
              <h3>08/2024 — Present</h3>
            </div>
            <p>
              Spearheaded instruction for 40+ students in Software Quality Control & Management, designing hands-on assignments in functional testing and automation that improved completion accuracy by 30%. Mentored students in test automation frameworks using Selenium and Katalon Studio, reducing debugging resolution time by 40%. Formulated testing curricula bridging QA theory with DevOps strategies, increasing practical assessment scores by 25%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineering Intern</h4>
                <h5>XSQUADS Tech Private Limited</h5>
              </div>
              <h3>01/2024 — 08/2024</h3>
            </div>
            <p>
              Developed and maintained backend services with automated infrastructure provisioning using Terraform and CloudFormation, reducing manual deployment effort by 45%. Constructed CI/CD pipelines with GitHub Actions and integrated monitoring via CloudWatch, decreasing release cycle time by 35%. Integrated REST API endpoints, reducing production bug reports by 20%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Master of Science — Information Systems</h4>
                <h5>Northeastern University</h5>
              </div>
              <h3>08/2024 — 05/2026</h3>
            </div>
            <p>
              Currently pursuing MS in Information Systems with a GPA of 3.53. Coursework includes Cloud Computing, Database Management and Database Design, CI/CD, Containerization, and Microservices. Expected graduation May 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

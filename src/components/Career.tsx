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
                <h4>TA Mentor — Software Quality Control & Management</h4>
                <h5>Northeastern University</h5>
              </div>
              <h3>2025 — NOW</h3>
            </div>
            <p>
              One of only 4 TA Mentors at Northeastern University, mentoring 37 Teaching Assistants and guiding 40+ students. Designed hands-on assignments in functional testing and data-driven automation, improving assignment completion accuracy by 30%. Mentored students in Selenium and Katalon Studio, reducing debugging resolution time by 40%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineering Intern</h4>
                <h5>XSQUADS Tech Private Limited</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Developed and maintained backend services and REST APIs using Node.js and PostgreSQL. Automated infrastructure provisioning with Terraform and CloudFormation, reducing manual deployment effort by 45%. Built CI/CD pipelines with GitHub Actions, decreasing release cycle time by 35% and improving system observability by 30%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Master of Science — Information Systems</h4>
                <h5>Northeastern University</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Currently pursuing MS in Information Systems with a GPA of 3.53. Coursework includes Cloud Computing, Database Management, and Database Design. Expected graduation May 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

import React from "react";
import "../styles/about_us.module.css"; // Add the corresponding CSS file for styling

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-page">
      
      {/* Team Section */}
      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <h3>Aniket R T</h3>
            <p>1RV23AI017</p>
          </div>
          <div className="team-member">
            <h3>Amogh A P</h3>
            <p>1RV23AI012</p>
          </div>
          <div className="team-member">
            <h3>Anika Vidya Raghav</h3>
            <p>1RV23AI016</p>
          </div>
          <div className="team-member">
            <h3>Anupama</h3>
            <p>1RV23AI018</p>
          </div>
          <div className="team-member">
            <h3>Bheemraj Doddamani</h3>
            <p>1RV23AI028</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

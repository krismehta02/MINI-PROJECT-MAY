import React from 'react';
import '../AboutUs.css';
// import bgImage from '../assets/download1.jpg';



/* Background & Gallery images
import img1 from '../assets/gallery1.jpg';
import img2 from '../assets/gallery2.jpg';
import img3 from '../assets/gallery3.jpg';*/

/*Team member images
import member1 from '../assets/member1.jpg';
import member2 from '../assets/member2.jpg';
import member3 from '../assets/member3.jpg';*/

function AboutUs() {
  return (
    <div
      className="aboutus-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="aboutus-title">About Us</h1>

      <div className="aboutus-box">
        <ul>
          <li>The most precious gift that one can give is the gift of life.</li>
          <li>Your blood saves more than one life when separated into components.</li>
          <li>Blood is needed regularly for patients and major surgeries.</li>
          <li>It also improves your health!</li>
        </ul>
      </div>

      {/* Gallery Section */}
      <div className="gallery-section">
        <h2>Gallery</h2>
        <div className="gallery-grid">
          <img src={img1} alt="Gallery 1" />
          <img src={img2} alt="Gallery 2" />
          <img src={img3} alt="Gallery 3" />
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src={member1} alt="Kris Mehta" />
            <h4>Kris Mehta</h4>
            <p>Frontend Developer</p>
          </div>

          <div className="team-member">
            <img src={member2} alt="Harshada Ghadge" />
            <h4>Harshada Ghadge</h4>
            <p>Backend Developer</p>
          </div>

          <div className="team-member">
            <img src={member3} alt="Kajal Palwe" />
            <h4>Kajal Palwe</h4>
            <p>UI/UX Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

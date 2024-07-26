import React from 'react';
import './about.css'; // Import CSS file for styling


const About = () => {
  const peelas = [
    '/peela1.png',
    '/peela2.png',
    '/peela3.png',
    '/peela4.png'
  ];
  //-------------------------------------------------------------------------
  return (
    <div className="about">
      <h1>About Us</h1>
      <div className="about-container">
      <div className="about-bubble">
      <p>
        Hi there! We are here to help you and many alike 
        people who wish to learn about various things of world via
         our interactive paltform!
      </p>
      <br></br>
      <p>We believe in that anyone can learn at anytime. There is no age defined for learning.</p>
      <br></br>
      <p>Your's Truly,</p>
      <br></br>
      <hr></hr>
      <h2>Neuro</h2>
      <hr></hr>

      </div>
      </div>
      <div className="peela-container">
        {peelas.map((src, index) => (
          <img key={index} src={src} alt="Peela" className="peela" style={{ animationDelay: `${index * 2.5}s` }} />
        ))}
      </div>
    </div>
  );
};

export default About;

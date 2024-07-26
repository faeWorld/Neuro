// src/components/AnimatedSpaceship.js
import React, { useEffect, useState } from 'react';
import './animatedspaceship.css'; // Import the CSS file for styling

const numSpaceships = 4; // Total number of spaceships

// List of spaceship images
const spaceshipImages = [
  '/spaceship1.png',
  '/spaceship2.png',
  '/spaceship3.png',
  '/spaceship4.png'
];

const AnimatedSpaceship = () => {
  const [spaceships, setSpaceships] = useState([]);

  useEffect(() => {
    const initializeSpaceships = () => {
      const newSpaceships = [];
      for (let i = 0; i < numSpaceships; i++) {
        newSpaceships.push({
          id: i,
          top: Math.random() * window.innerHeight,
          left: Math.random() * window.innerWidth,
          direction: Math.random() * 360, // Random initial direction
          image: spaceshipImages[i % spaceshipImages.length] // Assign an image
        });
      }
      setSpaceships(newSpaceships);
    };

    initializeSpaceships();
  }, []);

  useEffect(() => {
    const moveSpaceships = () => {
      setSpaceships((prevSpaceships) => {
        return prevSpaceships.map((spaceship) => {
          const angle = (spaceship.direction * Math.PI) / 180;
          const speed = 2; // Speed of movement
          const deltaX = Math.cos(angle) * speed;
          const deltaY = Math.sin(angle) * speed;

          // Calculate new position
          let newLeft = spaceship.left + deltaX;
          let newTop = spaceship.top + deltaY;

          // Ensure spaceships stay within viewport boundaries
          newLeft = Math.max(0, Math.min(window.innerWidth - 100, newLeft)); // Adjust 100 for spaceship width
          newTop = Math.max(0, Math.min(window.innerHeight - 100, newTop)); // Adjust 100 for spaceship height

          // Bounce off walls by changing direction
          if (newLeft <= 0 || newLeft >= window.innerWidth - 100) {
            spaceship.direction = 180 - spaceship.direction;
          }
          if (newTop <= 0 || newTop >= window.innerHeight - 100) {
            spaceship.direction = 360 - spaceship.direction;
          }

          return {
            ...spaceship,
            top: newTop,
            left: newLeft,
            direction: spaceship.direction,
          };
        });
      });
    };

    const interval = setInterval(moveSpaceships, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="spaceship-container">
      {spaceships.map((spaceship) => (
        <div
          key={spaceship.id}
          className="spaceship-wrapper"
          style={{ top: `${spaceship.top}px`, left: `${spaceship.left}px` }}
        >
          <img src={spaceship.image} alt={`Spaceship ${spaceship.id}`} className="spaceship" />
          <div className="dotted-trail"></div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedSpaceship;

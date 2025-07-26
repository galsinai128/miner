// Fireworks.tsx
import { Fireworks } from '@fireworks-js/react';
import './Fireworks.sass';

const fireworksOptions = {
  rocketsPoint: { min: 50, max: 50 },
  hue: { min: 0, max: 360 },
  delay: { min: 15, max: 30 },
  speed: 2,
  acceleration: 1.05,
  friction: 0.98,
  gravity: 1.5,
  particles: 50,
  trace: 3,
  explosion: 5,
  brightness: { min: 50, max: 80 },
  decay: { min: 0.015, max: 0.03 },
  autoresize: true,
  lineWidth: { explosion: { min: 1, max: 3 }, trace: { min: 1, max: 2 } },
};


const FireworksComponent = () => {
  return (
    <div className="fireworks-overlay">
      <Fireworks options={fireworksOptions}/>
    </div>
  );
};

export default FireworksComponent;

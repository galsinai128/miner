import React from 'react';
import './FullScreenLoader.sass';

const FullScreenLoader: React.FC = () => {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default FullScreenLoader;

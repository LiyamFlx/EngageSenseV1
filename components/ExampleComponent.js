
import React, { useEffect, useState } from 'react';

const ExampleComponent = () => {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentTime(Date.now());
    }
  }, []);

  return (
    <div>
      {/* ...existing code... */}
      {currentTime && <p>Current Time: {currentTime}</p>}
      {/* ...existing code... */}
    </div>
  );
};

export default ExampleComponent;
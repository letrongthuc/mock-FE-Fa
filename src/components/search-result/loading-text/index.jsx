import { useState, useEffect } from 'react';

function LoadingText() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return <span className="text-[#2C2C47] text-lg">{dots}</span>;
}

export default LoadingText;

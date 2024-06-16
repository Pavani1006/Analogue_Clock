import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const seconds = date.getSeconds();
      const minutes = date.getMinutes();
      const hours = date.getHours();

      const secToDeg = (seconds / 60) * 360;
      const minToDeg = (minutes / 60) * 360;
      const hrToDeg = (hours % 12 / 12) * 360 + (minutes / 60) * 30;

      document.querySelector(".second").style.transform = `rotate(${secToDeg}deg)`;
      document.querySelector(".minute").style.transform = `rotate(${minToDeg}deg)`;
      document.querySelector(".hour").style.transform = `rotate(${hrToDeg}deg)`;
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="container">
      <div className="clock">
        {Array.from({ length: 12 }, (_, i) => (
          <label key={i} style={{ "--i": i + 1 }}>
            <span>{i + 1}</span>
          </label>
        ))}
        <div className="indicator">
          <span className="hand hour"></span>
          <span className="hand minute"></span>
          <span className="hand second"></span>
        </div>
      </div>
      <div className="mode-switch" onClick={toggleMode}>
        {isDarkMode ? "Change to Light Mode" : " Change to Dark Mode"}
      </div>
    </div>
  );
};

export default App;

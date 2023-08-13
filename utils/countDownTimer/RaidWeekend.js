import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

const getNextFriday = () => {
  const now = new Date();
  const daysUntilNextFriday = (5 + 7 - now.getDay()) % 7;
  const nextFriday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilNextFriday);
  nextFriday.setHours(12);
  nextFriday.setMinutes(30);
  return nextFriday;
};

const RaidWeekend = () => {
  const [targetDate, setTargetDate] = useState(getNextFriday());

  useEffect(() => {
    const timer = setInterval(() => {
      setTargetDate(getNextFriday());
    }, 60 * 60 * 1000); // Check every hour if the target date needs to be updated

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Countdown date={targetDate} renderer={({ days, hours, minutes, seconds }) => (
      <div>
        <p>{`${days}d ${hours}h ${minutes}m`}</p>
      </div>
    )}/>
  );
};

export default RaidWeekend;

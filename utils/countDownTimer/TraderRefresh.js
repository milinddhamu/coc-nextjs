import { useState, useEffect } from 'react';
import React from 'react';
import Countdown from 'react-countdown';

const getNextTuesday = () => {
  const now = new Date();
  const daysUntilNextTuesday = (2 + 7 - now.getDay()) % 7;
  const nextTuesday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilNextTuesday);
  nextTuesday.setHours(13);
  nextTuesday.setMinutes(30);
  return nextTuesday;
};

const TraderRefresh = () => {
  const [targetDate, setTargetDate] = useState(getNextTuesday());

  useEffect(() => {
    const timer = setInterval(() => {
      setTargetDate(getNextTuesday());
    }, 60 * 60 * 1000); // Check every hour if the target date needs to be updated

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Countdown date={targetDate} renderer={({ days, hours, minutes, seconds }) => (
      <div>
        {`${days}d ${hours}h ${minutes}m`}
      </div>
    )} />
  );
};

export default TraderRefresh;

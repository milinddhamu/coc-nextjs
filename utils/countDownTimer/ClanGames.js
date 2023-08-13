import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

const getNext22nd = () => {
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth();
  let nextMonth;
  let nextYear;

  if (currentDay > 22) {
    // If the current day is past the 22nd of the month
    nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    nextYear = currentMonth === 11 ? now.getFullYear() + 1 : now.getFullYear();
  } else {
    // If the current day is on or before the 22nd of the month
    nextMonth = currentMonth;
    nextYear = now.getFullYear();
  }

  const next22nd = new Date(nextYear, nextMonth, 22);
  next22nd.setHours(13);
  next22nd.setMinutes(30);
  return next22nd;
};

const ClanGames = () => {
  const [targetDate, setTargetDate] = useState(getNext22nd());

  useEffect(() => {
    const timer = setInterval(() => {
      setTargetDate(getNext22nd());
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
    )} />
  );
};

export default ClanGames;

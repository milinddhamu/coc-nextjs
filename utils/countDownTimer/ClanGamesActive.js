import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

const ClanGamesActive = () => {
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    let nextMonth = currentMonth;
    let nextYear = currentYear;

    if (currentDay > 28) {
      nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    }

    const targetDate = new Date(nextYear, nextMonth, 28, 13, 30, 0);
    setTargetDate(targetDate);
  }, []);

  const renderer = ({ days, hours, minutes, seconds }) => (
    <span>
      {days}d {hours}h {minutes}m
    </span>
  );

  return (
    <div>
      {targetDate && <Countdown date={targetDate} renderer={renderer} />}
    </div>
  );
};

export default ClanGamesActive;

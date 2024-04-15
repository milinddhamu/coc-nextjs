import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

const getLastMondayOfMonth = (year, month) => {
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const lastDayDate = new Date(year, month, lastDayOfMonth);
  let lastMonday;

  for (let day = lastDayOfMonth; day >= 1; day--) {
    const date = new Date(year, month, day);
    if (date.getDay() === 1) {
      lastMonday = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 30, 0);
      break;
    }
  }

  return lastMonday;
};

const LeagueReset = () => {
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const lastMonday = getLastMondayOfMonth(currentYear, currentMonth);
    setTargetDate(lastMonday);
  }, []);

  return (
    <div>
      {targetDate && (
        <Countdown
          date={targetDate}
          renderer={({ days, hours, minutes, seconds }) => (
            <div>
              <p>{`${days}d ${hours}h ${minutes}m`}</p>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default LeagueReset;

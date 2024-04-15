import React from 'react';
import Countdown from 'react-countdown';

const ClanWarLeague = () => {
  // Calculate the target date for the next occurrence of the 1st of the next month at 08:00 UTC
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  const targetDate = new Date(Date.UTC(nextYear, nextMonth, 1, 8, 0, 0));

  return (
    <div>
      <Countdown date={targetDate} renderer={({ days, hours, minutes, seconds }) => (
            <div>
              <p>{`${days}d ${hours}h ${minutes}m`}</p>
            </div>
          )} />
    </div>
  );
};

export default ClanWarLeague;

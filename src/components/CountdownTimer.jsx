
import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; 

const CountdownTimer = () => {
  const targetDate = new Date('December 25, 2025 00:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        // Время вышло!
        setIsExpired(true);
        return;
      }

      // Рассчитываем дни, часы, минуты, секунды
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    // Обновляем каждую секунду
    const timerInterval = setInterval(updateTimer, 1000);
    
    // Первоначальный вызов
    updateTimer();

    // Очистка интервала при размонтировании
    return () => clearInterval(timerInterval);
  }, [targetDate]);

  return (
    <div className="countdown-container">
      <h2 className="countdown-title">ДО ПРЕМЬЕРЫ 5 ЭПИЗОДА 5 СЕЗОНА!</h2>
      
      {isExpired ? (
        <div className="countdown-expired">
          <h3> ЭПИЗОД УЖЕ ВЫШЕЛ! </h3>
        </div>
      ) : (
        <>
          <div className="countdown-grid">
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.days}</span>
              <span className="countdown-label">Дней</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.hours}</span>
              <span className="countdown-label">Часов</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.minutes}</span>
              <span className="countdown-label">Минут</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.seconds}</span>
              <span className="countdown-label">Секунд</span>
            </div>
          </div>
          
          
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
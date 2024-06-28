import React, { useState, useEffect } from 'react';
import './Now.css';
import { FaClock } from 'react-icons/fa';

const Now = ({ events, simulatedTime }) => {
   const [currentEvent, setCurrentEvent] = useState(null);
   const [nextEvent, setNextEvent] = useState(null);
   const [upcomingEvents, setUpcomingEvents] = useState([]);
   const [currentTime, setCurrentTime] = useState(simulatedTime);

   console.log('Events in Now component:', events);
   useEffect(() => {
      setCurrentTime(simulatedTime);
   }, [simulatedTime]);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentTime((prevTime) => new Date(prevTime.getTime() + 1000)); // Simulate time progression
      }, 1000);
      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      if (events.length > 0) {
         console.log('Events in Now component:', events);

         // Assuming events is an array of objects with the structure:
         // { event_name: string, activities: array of activity objects }
         const allActivities = events.flatMap(event => event.activities);
         console.log('All Activities:', allActivities);

         const current = allActivities.find(
            (activity) => new Date(`2024-06-22T${activity.start}:00`) <= currentTime && new Date(`2024-06-22T${activity.end}:00`) >= currentTime
         );
         const next = allActivities.find(
            (activity) => new Date(`2024-06-22T${activity.start}:00`) > currentTime
         );
         const upcoming = allActivities
            .filter((activity) => new Date(`2024-06-22T${activity.start}:00`) > currentTime)
            .slice(0, 5); // Select the next five upcoming activities

         console.log('Current Activity:', current);
         console.log('Next Activity:', next);
         console.log('Upcoming Activities:', upcoming);

         setCurrentEvent(current);
         setNextEvent(next);
         setUpcomingEvents(upcoming);
      }
   }, [events, currentTime]);

   useEffect(() => {
      if (Notification.permission !== 'granted') {
         Notification.requestPermission();
      }
   }, []);

   useEffect(() => {
      const checkNotificationTimes = () => {
         const now = currentTime.getTime();

         if (currentEvent) {
            const endDiff = (new Date(`2024-06-22T${currentEvent.end}:00`).getTime() - now) / 60000; // Time remaining in minutes
            if (endDiff <= 5 && endDiff > 4) {
               showNotification('Current Event Ending Soon', '5 minutes remaining for ' + currentEvent.activity_type);
               vibratePhone();
            }
         }

         if (nextEvent) {
            const startDiff = (new Date(`2024-06-22T${nextEvent.start}:00`).getTime() - now) / 60000; // Time until start in minutes
            if (startDiff <= 5 && startDiff > 4) {
               showNotification('Next Event Starting Soon', '5 minutes until ' + nextEvent.activity_type);
               vibratePhone();
            } else if (startDiff <= 0 && startDiff > -1) {
               showNotification('Event Starting', nextEvent.activity_type + ' is starting now.');
               vibratePhone();
            }
         }
      };

      const interval = setInterval(checkNotificationTimes, 60000); // Check every minute
      return () => clearInterval(interval);
   }, [currentEvent, nextEvent, currentTime]);

   const showNotification = (title, body) => {
      if (Notification.permission === 'granted') {
         navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(title, {
               body,
               icon: '/icon-192x192.png',
               badge: '/badge-72x72.png'
            });
         });
      }
   };

   const vibratePhone = () => {
      if (navigator.vibrate) {
         navigator.vibrate([200, 100, 200]); // Vibration pattern
      }
   };

   const formatTime = (date) => {
      return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
   };

   const timeDiffInHHMM = (endTime) => {
      const diff = new Date(`2024-06-22T${endTime}:00`) - currentTime;
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
   };

   return (
      <div className="now-container">
         <div className="now-section">
            <div className="header">
               <h2>NOW</h2>
               {currentEvent && (
                  <div className="timer">
                     <FaClock /> {timeDiffInHHMM(currentEvent.end)} remaining
                  </div>
               )}
            </div>
            {currentEvent ? (
               <div className="event-card">
                  <div className="event-time">
                     <div className="start-time">{formatTime(`2024-06-22T${currentEvent.start}:00`)}</div>
                     <div className="to-time">to</div>
                     <div className="end-time">{formatTime(`2024-06-22T${currentEvent.end}:00`)}</div>
                  </div>
                  <div className="event-details">
                     <h3>{currentEvent.activity_type}</h3>
                     <p>{currentEvent.description}</p>
                     <p><strong>Leader:</strong> {currentEvent.leader}</p>
                     <p><strong>Support:</strong> {currentEvent.support}</p>
                  </div>
               </div>
            ) : (
               <p>No ongoing event</p>
            )}
         </div>
         <div className="next-section">
            <div className="header">
               <h2>NEXT</h2>
               {nextEvent && (
                  <div className="timer">
                     <FaClock /> starts in {timeDiffInHHMM(nextEvent.start)}
                  </div>
               )}
            </div>
            {nextEvent ? (
               <div className="event-card">
                  <div className="event-time">
                     <div className="start-time">{formatTime(`2024-06-22T${nextEvent.start}:00`)}</div>
                     <div className="to-time">to</div>
                     <div className="end-time">{formatTime(`2024-06-22T${nextEvent.end}:00`)}</div>
                  </div>
                  <div className="event-details">
                     <h3>{nextEvent.activity_type}</h3>
                     <p>{nextEvent.description}</p>
                     <p><strong>Leader:</strong> {nextEvent.leader}</p>
                     <p><strong>Support:</strong> {nextEvent.support}</p>
                  </div>
               </div>
            ) : (
               <p>No upcoming event</p>
            )}
         </div>
         <div className="coming-up-section">
            <div className="header">
               <h2>COMING UP</h2>
            </div>
            {upcomingEvents.length > 0 ? (
               upcomingEvents.map((event, index) => (
                  <div key={index} className="event-card">
                     <div className="event-time">
                        <div className="start-time">{formatTime(`2024-06-22T${event.start}:00`)}</div>
                        <div className="to-time">to</div>
                        <div className="end-time">{formatTime(`2024-06-22T${event.end}:00`)}</div>
                     </div>
                     <div className="event-details">
                        <h3>{event.activity_type}</h3>
                        <p>{event.description}</p>
                        <p><strong>Leader:</strong> {event.leader}</p>
                        <p><strong>Support:</strong> {event.support}</p>
                     </div>
                  </div>
               ))
            ) : (
               <p>No upcoming events</p>
            )}
         </div>
      </div>
   );
};

export default Now;

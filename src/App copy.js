import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaCog, FaCalendarCheck, FaBell } from 'react-icons/fa';
import Now from './Now';
import Schedule from './Schedule';
import MySchedule from './MySchedule';
import EventDetails from '../EventDetails';
import Settings from '../Settings';
import './App.css';

function App() {
   const [groupSelections, setGroupSelections] = useState({
      'All': true,
      'Catering Team': false,
      'Medic': false,
      'Scouts': false,
      'Adults': false,
      'Special 1': false,
      'Special 2': false,
   });

   const [simulatedTime, setSimulatedTime] = useState(new Date('2024-06-22T14:30:00')); // Default simulated time
   const [showPopup, setShowPopup] = useState(false);

   useEffect(() => {
      const interval = setInterval(() => {
         setSimulatedTime((prevTime) => new Date(prevTime.getTime() + 1000));
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   const handleTitleClick = () => {
      setShowPopup(true);
   };

   const handleTimeChange = (event) => {
      setSimulatedTime(new Date(event.target.value));
   };

   const handlePopupClose = () => {
      setShowPopup(false);
   };

   const formatSimulatedTimeForInput = (date) => {
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - (offset * 60 * 1000));
      return localDate.toISOString().slice(0, 16);
   };

   const formatSimulatedTimeForDisplay = (date) => {
      return date.toLocaleString('en-GB', { hour12: false });
   };

   const requestNotificationPermission = async () => {
      console.log('Requesting notification permission...');
      const currentPermission = Notification.permission;
      console.log('Current notification permission:', currentPermission);

      const permission = await Notification.requestPermission();
      console.log('Requested notification permission:', permission);

      if (permission === 'granted') {
         console.log('Notification permission granted.');
      } else {
         console.log('Notification permission denied.');
      }
      return permission;
   };

   const sendTestNotification = async () => {
      const permission = Notification.permission;
      console.log('Notification permission before sending test notification:', permission);

      if (permission === 'default') {
         const result = await requestNotificationPermission();
         if (result === 'granted') {
            triggerTestNotification();
         }
      } else if (permission === 'granted') {
         triggerTestNotification();
      } else {
         console.log('Notification permission denied.');
      }
   };

   const triggerTestNotification = () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
         navigator.serviceWorker.ready.then((registration) => {
            registration.active.postMessage({
               type: 'test-push',
               title: 'Test Notification',
               body: 'This is a test notification.',
            });
         });
      }
   };

   return (
      <Router>
         <div className="App">
            <header className="App-header">
               <h1 onClick={handleTitleClick}>scema</h1>
               <div className="simulated-time">
                  <span>Time: </span>
                  {formatSimulatedTimeForDisplay(simulatedTime)}
               </div>
               <button className="test-notification-button" onClick={sendTestNotification}>
                  <FaBell />
               </button>
            </header>
            <main>
               <Routes>
                  <Route path="/" element={<Navigate to="/now" />} />
                  <Route path="/now" element={<Now simulatedTime={simulatedTime} />} />
                  <Route path="/schedule" element={<Schedule simulatedTime={simulatedTime} />} />
                  <Route path="/my-schedule" element={<MySchedule userName="Fraser Hewson" groupSelections={groupSelections} simulatedTime={simulatedTime} />} />
                  <Route path="/event/:id" element={<EventDetails simulatedTime={simulatedTime} />} />
                  <Route path="/settings" element={<Settings groupSelections={groupSelections} setGroupSelections={setGroupSelections} />} />
                  <Route path="*" element={<Navigate to="/now" />} />
               </Routes>
            </main>
            <nav className="bottom-nav">
               <NavLink to="/now" className="nav-link">
                  <FaCalendarCheck />
                  <span>Now</span>
               </NavLink>
               <NavLink to="/schedule" className="nav-link">
                  <FaCalendarAlt />
                  <span>Schedule</span>
               </NavLink>
               <NavLink to="/my-schedule" className="nav-link">
                  <FaUser />
                  <span>My Schedule</span>
               </NavLink>
               <NavLink to="/settings" className="nav-link">
                  <FaCog />
                  <span>Settings</span>
               </NavLink>
            </nav>

            {showPopup && (
               <div className="popup">
                  <div className="popup-content">
                     <h2>Adjust Simulated Time</h2>
                     <input
                        type="datetime-local"
                        value={formatSimulatedTimeForInput(simulatedTime)}
                        onChange={handleTimeChange}
                     />
                     <button onClick={handlePopupClose}>Close</button>
                  </div>
               </div>
            )}
         </div>
      </Router>
   );
}

export default App;

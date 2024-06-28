import React, { useState, useEffect } from 'react';
import './Schedule.css';
import { FaSort } from 'react-icons/fa';

const MySchedule = ({ userName = 'Fraser Hewson', groupSelections = {} }) => {
   const [events, setEvents] = useState([]);
   const [filteredEvents, setFilteredEvents] = useState([]);
   const [sortCriteria, setSortCriteria] = useState('start');
   const [menuOpen, setMenuOpen] = useState(false);

   useEffect(() => {
      const fetchEvents = async () => {
         try {
            const response = await fetch('/scema/events.json'); // Ensure this path is correct
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents(data['2024_weekend_events'][0].activities);
         } catch (error) {
            console.error('Failed to fetch events:', error);
         }
      };

      fetchEvents();
   }, []);

   useEffect(() => {
      const selectedGroups = Object.keys(groupSelections).filter(
         (group) => groupSelections[group]
      );

      const filtered = events.filter((event) => {
         return (
            event.leader === userName ||
            event.support === userName ||
            selectedGroups.includes(event.leader) ||
            selectedGroups.includes(event.support)
         );
      });

      setFilteredEvents(filtered);
   }, [events, userName, groupSelections]);

   const sortEvents = (events) => {
      return events.sort((a, b) => {
         if (sortCriteria === 'start') {
            return a.start.localeCompare(b.start);
         } else if (sortCriteria === 'leader') {
            return a.leader.localeCompare(b.leader);
         } else if (sortCriteria === 'support') {
            return a.support.localeCompare(b.support);
         } else if (sortCriteria === 'activity_type') {
            return a.activity_type.localeCompare(b.activity_type);
         } else {
            return 0;
         }
      });
   };

   const highlightName = (text) => {
      return text.split(userName).map((part, index) =>
         index === 0 ? part : <span key={index} className="highlight">{userName}</span>
      );
   };

   const groupedEvents = {
      'Friday Advance': [],
      'Friday': [],
      'Saturday': [],
      'Sunday': []
   };

   filteredEvents.forEach(event => {
      if (event.day) {
         groupedEvents[event.day].push(event);
      }
   });

   return (
      <div className="schedule">
         <h1>My Schedule</h1>
         <div className="sort-menu">
            <FaSort onClick={() => setMenuOpen(!menuOpen)} />
            {menuOpen && (
               <div className="sort-options">
                  <button onClick={() => setSortCriteria('start')}>Sort by Start Time</button>
                  <button onClick={() => setSortCriteria('leader')}>Sort by Leader</button>
                  <button onClick={() => setSortCriteria('support')}>Sort by Support</button>
                  <button onClick={() => setSortCriteria('activity_type')}>Sort by Activity Type</button>
               </div>
            )}
         </div>
         {Object.keys(groupedEvents).map(day => (
            <div key={day} className="day-group">
               <h2>{day}</h2>
               <div className="event-list">
                  {groupedEvents[day].length > 0 ? (
                     sortEvents(groupedEvents[day]).map((event, index) => (
                        <div key={index} className="event-card">
                           <div className="event-time">
                              <div className="start-time">{event.start}</div>
                              <div className="to-time">to</div>
                              <div className="end-time">{event.end}</div>
                           </div>
                           <div className="event-details">
                              <h3 className={event.activity_type.includes(userName) ? 'bold' : ''}>
                                 {highlightName(event.activity_type)}
                              </h3>
                              <p>{event.description}</p>
                              <p><strong>Leader:</strong> {highlightName(event.leader)}</p>
                              <p><strong>Support:</strong> {highlightName(event.support)}</p>
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className="event-card no-event">
                        <p>No events scheduled for this day.</p>
                     </div>
                  )}
               </div>
            </div>
         ))}
      </div>
   );
};

export default MySchedule;

import React, { useEffect, useState } from 'react';
import './Schedule.css';

const MySchedule = ({ events = [], userRoles = [], userName = '', groupSelections = {}, simulatedTime }) => {
   const [filteredEvents, setFilteredEvents] = useState([]);

   useEffect(() => {
      const flattenedEvents = events.flatMap(event => event.activities);

      if (flattenedEvents.length > 0) {
         const selectedGroups = Object.keys(groupSelections).filter(group => groupSelections[group]);
         const filtered = flattenedEvents.filter(event => {
            const leaderMatch = event.leader && event.leader.includes(userName);
            const supportMatch = event.support && event.support.includes(userName);
            const roleMatch = userRoles.some(role => role.username === userName && (
               (role.role1 && event.leader && event.leader.includes(role.role1)) ||
               (role.role2 && event.leader && event.leader.includes(role.role2)) ||
               (role.role3 && event.leader && event.leader.includes(role.role3))
            ));
            return leaderMatch || supportMatch || roleMatch || selectedGroups.includes(event.leader) || selectedGroups.includes(event.support);
         });
         setFilteredEvents(filtered);
      } else {
         console.error('No events data provided to MySchedule component.');
      }
   }, [events, userRoles, userName, groupSelections]);

   const highlightName = (text) => {
      return text.split(userName).map((part, index) =>
         index === 0 ? part : <span key={index} className="highlight">{userName}</span>
      );
   };

   const groupedEvents = {
      'Advance Party Friday': [],
      'Friday': [],
      'Saturday': [],
      'Sunday': []
   };

   filteredEvents.forEach(event => {
      if (event.day && groupedEvents[event.day]) {
         groupedEvents[event.day].push(event);
      } else {
         console.warn('Event with undefined or invalid day:', event.activity_type, event.start, event.end);
      }
   });

   return (
      <div className="schedule">
         <h1>My Schedule</h1>
         {Object.keys(groupedEvents).map(day => (
            <div key={day} className="day-group">
               <h2>{day}</h2>
               <div className="event-list">
                  {groupedEvents[day].length > 0 ? (
                     groupedEvents[day].map((event, index) => (
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

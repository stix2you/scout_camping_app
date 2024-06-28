import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
   const { id } = useParams();
   const [event, setEvent] = useState(null);

   useEffect(() => {
      // Fetch event details based on the id
      const fetchEventDetails = async () => {
         try {
            const response = await fetch(`/api/events/${id}`);
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvent(data);
         } catch (error) {
            console.error('Failed to fetch event details:', error);
         }
      };

      fetchEventDetails();
   }, [id]);

   if (!event) {
      return <div>Loading...</div>;
   }

   return (
      <div className="event-details">
         <h2>{event.activity_type}</h2>
         <p>{event.description}</p>
         <p><strong>Time:</strong> {event.start} - {event.end}</p>
         <p><strong>Location:</strong> {event.location}</p>
         <p><strong>Leader:</strong> {event.leader}</p>
      </div>
   );
};

export default EventDetails;

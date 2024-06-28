DEPLOYMENT:

Stay tuned...

DEV ENVIRONMENT:
To get up and running in dev server, go to your projects folder, clone repo:

   git clone https://github.com/stix2you/scema

Go to directory:

   cd scema

Install dependencies:

   npm install

BACK-END: this launches the data server, which needs to be running first, you can do this in the same project folder, but a separate terminal window

   set NODE_ENV=development
   node server/server.js

FRONT-END: Launch client side app

   npm run client


-----------------------------------------------

To install panda for the python csv converter script, first download and install current version of Python, be sure pip is installed and Python is part of system PATH, then in project terminal:

   pip install panda


-----------------------------------------------

Project Brief: Scout Camp Event Management App (SCEMA)

Project Title: Scout Camp Event Management App

Project Overview: Develop a Progressive Web Application (PWA) designed to streamline the management and coordination of a three-day camp for 10-year-old scouts. The app will serve as an "in-pocket" guide, helping participants and organizers stay on track with the schedule, receive timely notifications, and access detailed information about each event. The app will be functional offline, with a minimalist UI/UX to ensure ease of use and focus on essential features.

Objectives:

Provide a real-time, "in-pocket" guide for participants, guiding them through their day.
Allow users to view, filter, and arrange events on a calendar.
Enable organizers to edit and update the schedule.
Offer personalized agendas for each user.
Send automatic notifications and updates.
Ensure offline functionality with local data storage.
Provide access to the program sheet in PDF format, downloadable to local storage.

User Stories:

As an organizer, I want to upload the camp schedule into the app so that all participants can view it.

As an organizer, I want to edit the schedule within the app to make last-minute changes.

As a participant, I want to view the entire schedule to know what events are planned.

As a participant, I want to see my individual agenda based on my role (leader or support team) so I know what I need to do.

As a participant, I want to receive notifications about upcoming events so I don't miss any activities.

As an organizer, I want to reorder the schedule easily to reflect changes in the program.

As a participant, I want to view detailed information about each event, including the start time, end time, description, location, and leader.

As an organizer, I want the app to send notifications and updates to users automatically to keep everyone informed.

As a participant, I want the app to work offline and update when an internet connection is available so I can access information anytime.

As a participant, I want to access the program sheet for the entire activity in PDF format and download it to local storage.


Features:

Event Calendar: Multiple events on a calendar view, filterable and easy to navigate.

Schedule Loading and Editing: Organizers can upload and modify the schedule within the app.

Detailed Event View: Access detailed information about each event.

Personal Agenda: Personalized view for each user showing relevant events.

Notifications: Automatic alerts for upcoming events with physical and audible notifications.

Offline Functionality: Local data storage with failover to a local IP if no internet is available.

Data Synchronization: Pull data from Google Sheets and store it in the app's database.

Minimalist UI/UX: Simple and unobtrusive design focusing on essential features.

Program Sheet Access: View and download the program sheet in PDF format.



UI/UX Design:

Tabs across the bottom for "What's Next," "My Schedule," "Overall Schedule," and "Settings."

Event details accessible by clicking on the event in the schedule.

PDF or Google Docs for detailed information sheets.

SEE USER FLOW DOCUMENT FOR DETAILS



Backend:

Cloud server to connect to Google Sheets and read contents for data storage.

Periodic synchronization with Google Sheets to ensure data is up-to-date.



Development Approach:

Agile methodology with fixed cost and timeline, flexible functional scope.

Regular meetings for sprint planning, review, and backlog management.

Use of Trello for task management and tracking.



Timeline:

Two weeks for rough draft: Initial design and development of core features.

End of September: Complete app development and testing.

October: App ready for the next camp.



Budget:

To be defined based on the scope and complexity of the app.





User Flow and UI/UX Brief: Scout Camp Event Management App (SCEMA)

User Flow:

Launch App:

User opens the Scout Camp Event Management App on their device.
Login/Authentication:
Organizer logs in with admin credentials.
Participants log in with their user credentials.

Home Screen:
User given option to select a camp if there is none set.  If the present camp set is past/not valid, user is directed to setting screen with message.
Tabs at the bottom for "What's Next," "My Schedule," "Overall Schedule," and "Settings."
Default view displays the "What's Next" tab.

What's Next:
Users see a countdown timer and details of the upcoming event.
Notification beeps/vibrates to remind users when the event is about to start (regardless of which screen they are on)

My Schedule:
Personalized agenda showing events relevant to the user (based on their role).
Users can click on any event to view detailed information.

Overall Schedule:
Complete list of all camp events.
Events displayed in a calendar or list format.
Users can filter events by type (meals, games, etc.), date, or time.

Event Details:
Clicking on an event opens a detailed view.
Information includes start time, end time, description, location, and leader.
Option to download the event details or program sheet in PDF format separate from the overall event details.

Settings:
Users can update their profile information.
Users can select which camp to access. Camps will be configured by name/date/location. This will remain the camp they have selected upon exit and restart until they select a new camp. 
Option to toggle notification settings (physical and audible notifications).
Admins (organizers) have additional options to upload and edit the schedule.
Admins have the ability to set the ip addresses of any local failures servers running on a laptop
Upload/Edit Schedule (Organizer Only):
Organizers access this feature through the settings tab.
Option to upload a new schedule from Google Sheets.
Edit existing schedule details.
Changes sync periodically with the cloud server and Google Sheets.

Offline Mode:
If the app detects no internet connection, it switches to offline mode.
Last updated data is stored locally and displayed to the user.
App syncs with the cloud server once the internet connection is restored.


UI/UX Brief:

Design Principles:
Minimalist Design: Focus on simplicity and ease of use.
Unobtrusive: The app should help users stay on track without being distracting.
Responsive Design: Ensure the app works well on various devices and screen sizes.
Intuitive Navigation: Easy-to-understand navigation with clear labels and icons.

Color Scheme:
Primary Colors: Calm and neutral colors like blues and greens to create a soothing user experience.
Accent Colors: Bright colors for notifications and important actions to draw attention when needed.

Typography:
Primary Font: A clean, sans-serif font for readability.
Secondary Font: A slightly bolder or italicized version for headings and important information.

Iconography:
Simple Icons: Use clear, easily recognizable icons for navigation tabs and action buttons.
Consistent Style: Ensure all icons follow the same design style and size for uniformity.

Layout:
Tabs: Fixed tabs at the bottom for primary navigation (What's Next, My Schedule, Overall Schedule, Settings).
Cards: Use card layout for events in the schedule to make information easily scannable.
Lists: For detailed views and schedules, use lists with clear headings and spacing.


Interactions:
Touch Gestures: Enable swipe gestures for navigation between tabs and events.
Clickable Elements: Ensure all interactive elements are easily tappable with sufficient spacing.
Notifications: Provide options for physical (vibration) and audible (sound) notifications, with user control over settings.

Offline Mode:
Seamless Transition: Clearly indicate when the app is offline, but ensure a smooth transition with no loss of functionality.
Local Data Storage: Store the most recent schedule data locally to ensure access even without internet connectivity.

Accessibility:
Font Size Adjustment: Allow users to adjust font sizes for better readability.
Contrast: Ensure sufficient color contrast for text and icons to be easily readable.
Voice Over: Support for screen readers and voice-over features for visually impaired users.

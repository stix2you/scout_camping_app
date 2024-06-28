<Router>
         <div className="App">
            <header className="App-header">
               <h1>Scema Event Management</h1>
               <nav>
                  <ul>
                     <li>
                        <Link to="/"><FaHome /> Home</Link>
                     </li>
                     <li>
                        <Link to="/schedule"><FaCalendar /> Schedule</Link>
                     </li>
                     <li>
                        <Link to="/my-schedule"><FaCalendar /> My Schedule</Link>
                     </li>
                     <li>
                        <Link to="/now"><FaClock /> Now</Link>
                     </li>
                     <li>
                        <Link to="/settings"><FaCog /> Settings</Link>
                     </li>
                  </ul>
               </nav>
            </header>
            <main>
               <Routes>
                  <Route path="/schedule" element={<Schedule events={events} />} />
                  <Route path="/my-schedule" element={<MySchedule events={events} userRoles={userRoles} />} />
                  <Route path="/now" element={<Now events={events} simulatedTime={new Date()} />} />
                  <Route path="/settings" element={
                     <>
                        <h2>Settings</h2>
                        <p>Settings content goes here.</p>
                     </>
                  } />
                  <Route path="/" element={
                     <>
                        <h2>Welcome to Scema Event Management App</h2>
                        <p>Select a section to get started.</p>
                     </>
                  } />
               </Routes>
            </main>
            <footer className="App-footer">
               <p>&copy; 2024 Scema Event Management</p>
               <p>
                  <Link to="/privacy-policy.html">Privacy Policy</Link> | <Link to="/terms-of-service.html">Terms of Service</Link>
               </p>
            </footer>
         </div>
      </Router>
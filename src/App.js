import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Projects from './components/Projects';
import Footer from './components/Footer';
import TaskManager from './components/TaskManager';
import AnalyticsSection from './components/Analytics';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import ProfileSection from './components/Profile';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Header />
        <Routes>
          <Route name="dashboard" path='/' element={<Dashboard/>}/>
          <Route name="projects" path='/projects' element={<Projects/>}/>
          <Route path="/project/:projectId" element={<ProfileSection />} />
          <Route name="tasks" path='/tasks' element={<TaskManager/>}/>
          <Route name="analytics" path='/analytics' element={<AnalyticsSection/>}/>
          <Route name="contact" path='/contact' element={<Contact/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import CreateFormPage from './pages/CreateFormPage.jsx';
import EditFormPage from './pages/EditFormPage.jsx';
import ViewFormPage from './pages/ViewFormPage.jsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/form/create" element={<CreateFormPage />} />
            <Route path="/form/:id/edit" element={<EditFormPage />} />
            <Route path="/form/:id" element={<ViewFormPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

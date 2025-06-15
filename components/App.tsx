import React from 'react';
import '../styles/globals.css';
import Header from './header';
import Main from './main';
import Footer from './footer';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;

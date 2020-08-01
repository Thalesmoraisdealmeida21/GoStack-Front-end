import React from 'react';
import GlobalStyle from './styles/global';
// import SignUp from './pages/signup';
import SignIn from './pages/signin';

import AppProvider from './hooks';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <>
    <BrowserRouter>

      <AppProvider>
        <Routes/>
      </AppProvider>

      <GlobalStyle />
    </BrowserRouter>

    </>
  );
};

export default App;

import React from 'react';
import GlobalStyle from './styles/global';
// import SignUp from './pages/signup';
import SignIn from './pages/signin';

import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>

      <GlobalStyle />
    </>
  );
};

export default App;

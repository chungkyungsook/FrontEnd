import React from 'react' ;

import GlobalStyle from './GlobalStyle' ;
import Router from './Router' ;
import { KinokoProvider } from './KinokoContext'

function App() {
  return (
      <KinokoProvider>
        <GlobalStyle />
        <Router />
      </KinokoProvider>
  ) ;
}

export default App ;

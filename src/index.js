import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoadContextProvider from './context/LoadContext';

import ToggleColorModeProv from './context/ThemeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

  <LoadContextProvider>
   
  <ToggleColorModeProv>
  
  
     
        <App />
      
 
        
  </ToggleColorModeProv>

  </LoadContextProvider>
  
  
);



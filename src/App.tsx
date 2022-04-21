import React from 'react';
import './App.css';

import { createClient } from '@supabase/supabase-js'
import Home from "./components/Home";



function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h3>
          Ønskeliste
        </h3>

      </header>
        <div className="min-w-full min-h-screen flex items-center justify-center bg-gray-200">
            {<Home />}
        </div>
    </div>
  );
}

export default App;

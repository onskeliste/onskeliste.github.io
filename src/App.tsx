import React from 'react';
import './App.css';

import { createClient } from '@supabase/supabase-js'
import Home from "./components/Home";



function App() {

    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wem94eXJhemN6dm9ldnR3dmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA0NTc3NzIsImV4cCI6MTk2NjAzMzc3Mn0.SeKxafUhM299H1w-qwz3I4WCOEHcMJyatiJE6MIASDI"

    const supabaseUrl = 'https://npzoxyrazczvoevtwvbd.supabase.co'
  //  const supabaseKey = process.env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

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

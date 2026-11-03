import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";
import { About, Contact, Home, Projects } from "./pages";

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <main className={`app-shell ${isDarkTheme ? "theme-night" : "theme-day"}`}>
      <div className='theme-orb orb-one' />
      <div className='theme-orb orb-two' />
      <div className='theme-orb orb-three' />
      <div className='night-sky' aria-hidden='true'>
        <span className='shooting-star shooting-star-one' />
        <span className='shooting-star shooting-star-two' />
        <span className='shooting-star shooting-star-three' />
      </div>

      <Router>
        <Navbar isDarkTheme={isDarkTheme} onToggleTheme={() => setIsDarkTheme(!isDarkTheme)} />
        <Routes>
          <Route path='/' element={<Home isDarkTheme={isDarkTheme} />} />
          <Route
            path='/*'
            element={
              <>
                <Routes>
                  <Route path='/about' element={<About />} />
                  <Route path='/projects' element={<Projects />} />
                  <Route path='/contact' element={<Contact />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;

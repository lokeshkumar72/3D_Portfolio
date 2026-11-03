import { NavLink } from "react-router-dom";

import { logo } from "../assets/images";

const Navbar = ({ isDarkTheme, onToggleTheme }) => {
  return (
    <header className='header flex-wrap gap-3'>
      <NavLink to='/' className='shrink-0'>
        <img src={logo} alt='logo' className='w-16 h-12 sm:w-20 sm:h-15 object-contain' />
      </NavLink>

      <nav className='flex items-center gap-4 text-sm font-medium sm:gap-7 sm:text-lg'>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            isActive
              ? "text-blue-600"
              : `transition-colors hover:text-blue-600 ${isDarkTheme ? "text-slate-100" : "text-slate-900"}`
          }
        >
          About
        </NavLink>
        <NavLink
          to='/projects'
          className={({ isActive }) =>
            isActive
              ? "text-blue-600"
              : `transition-colors hover:text-blue-600 ${isDarkTheme ? "text-slate-100" : "text-slate-900"}`
          }
        >
          Projects
        </NavLink>

        <button
          type='button'
          onClick={onToggleTheme}
          className={`theme-toggle ${isDarkTheme ? "theme-toggle-night" : "theme-toggle-day"}`}
          aria-label='Toggle day and night theme'
          title={isDarkTheme ? "Switch to day mode" : "Switch to night mode"}
        >
          <span className='theme-toggle-inner'>
            <span className='theme-toggle-icon'>{isDarkTheme ? "☀" : "☾"}</span>
          </span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

import { socialLinks } from "../constants";

const Footer = () => {
  const githubLink = socialLinks.find((link) => link.name === "GitHub");

  return (
    <footer className='footer font-poppins'>
      <hr className='border-slate-200' />

      <div className='footer-container'>
        <p>
          © 2025 <strong>Lokesh Kumar</strong>. All rights reserved.
        </p>

        <div className='footer-socials'>
          {githubLink && (
            <Link
              to={githubLink.link}
              target='_blank'
              rel='noopener noreferrer'
              className='footer-github-link'
            >
              <img src={githubLink.iconUrl} alt='' className='w-4 h-4 object-contain' />
              <span>GitHub</span>
              <span aria-hidden='true' className='footer-link-arrow'>↗</span>
            </Link>
          )}

          {socialLinks.filter((link) => link.name !== "GitHub").map((link) => (
            <Link
              key={link.name}
              to={link.link}
              target={link.link.startsWith("/") ? undefined : "_blank"}
              rel={link.link.startsWith("/") ? undefined : "noopener noreferrer"}
              aria-label={link.name}
              className='footer-social-link'
            >
              <img
                src={link.iconUrl}
                alt=''
                className='w-6 h-6 object-contain'
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

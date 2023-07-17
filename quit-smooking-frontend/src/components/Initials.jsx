import React, { useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import '../styles/Dashboard.css';

function Initials() {
  const { profile } = useContext(ProfileContext);
  const initials = getInitials();

  function getInitials() {
    if (profile && profile.name) {
      const fullName = profile.name;
      const names = fullName.split(' ');
      const initials = names.map(name => name.charAt(0).toUpperCase());
      return initials.join('');
    }
    return '';
  }

  return (
    <div>
      <div className="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-set rounded-full">
        <strong>
          <span className="initials-text">{initials}</span>
        </strong>
      </div>
    </div>
  );
}

export default Initials;

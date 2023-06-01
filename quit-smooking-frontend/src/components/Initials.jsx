import React from 'react'

function Initials() {

    function getInitials(fullName) {
        const names = fullName.split(' ');
        const initials = names.map(name => name[0].toUpperCase());
        return initials.join('');
      }
      
    const fullName = 'John Doe';
    const initials = getInitials(fullName);
    console.log(initials); // Output: JD

  return (
    <div>Initials</div>
  )
}

export default Initials
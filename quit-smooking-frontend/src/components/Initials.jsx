import React, { useContext, useState, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileContext';

function Initials() {
    const { profile, fetchUserProfile } = useContext(ProfileContext);
    const [isLoading, setIsLoading] = useState(true);
    const [initials, setInitials] = useState('');


    useEffect(()=> {    

        const getInitials = () => {
            try {
              if ( profile && profile.name){
                const fullName = profile.name;
                const names = fullName.split(' ');
                const initials = names.map(name => name[0].toUpperCase());
                setInitials(initials.join(''))
              }
                
            } catch (error) {
               console.error("Error finding the initials")
            }
        }
           
    
          const fetchData = async () => {
            try {
              await fetchUserProfile();
              getInitials();
            } catch (error) {
              console.error("Error fetching user profile:", error);
            } finally {
              setIsLoading(false);
            }
          };
      
          fetchData();
        
    }, [])

    

  return (
    <div>
        
    <div class="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span class="font-medium text-gray-600 dark:text-gray-300">{initials}</span>
    </div>

    </div>
  )
}

export default Initials
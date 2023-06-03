import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import LogoutBtn from "../components/LogoutBtn";
import ShareButtons from "../components/ShareButtons";
import "../Styles/User.css";

function Profile() {
  const { profile, fetchUserProfile } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [openAboutUs, setOpenAboutUs] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenAboutUs = () => {
    setOpenAboutUs(!openAboutUs)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await profile;
        console.log(profile)
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div className="user-background">
      <div className="user-wrapper">
        {isLoading ? (
          <div className="user-form-box sign-up">
            <p>Loading profile...</p>
          </div>
        ) : profile ? (
          <div className='user-extra-box'>
            <p>Email: {profile.email}</p>
            <p>Name: {profile.name}</p>
            {profile.goals && <p>Description: {profile.goals.description}</p>}
          </div>
        ) : (
          <p>Unable to fetch profile data.</p>
        )}

        <div className="user-container">
          <div className='user-extra-box'>
            <button onClick={fetchUserProfile}>REFRESH PROFILE</button>
          </div>

          <div className='flex-col user-extra-box'>
            <button onClick={toggleDropdown}>TELL A FRIEND</button>
            {isOpen && (
              <div className='dropdown-content'>
                <ShareButtons />
              </div>
            )}
          </div>

          <div className='flex-col'>
            <button onClick={handleOpenAboutUs}>ABOUT US</button>
            {openAboutUs && (
              <p>Welcome to our Quit Somoking App!

              At our app, we are dedicated to helping you on your journey to quit tobacco and embrace a healthier lifestyle. We understand that quitting tobacco can be challenging, but with the right support and resources, you can overcome the addiction and reclaim control of your life.
              
              Our app is designed to provide you with the tools and guidance you need to quit tobacco for good. We offer a variety of features and resources to support your journey, including:
              
              Personalized Quit Plan: Our app helps you create a customized quit plan based on your specific needs and preferences. It takes into account factors such as your smoking habits, motivation level, and triggers to develop a tailored approach to quitting.
              
              Tracking and Progress Monitoring: Easily track your progress and milestones along the way. Our app allows you to log your tobacco usage, cravings, and triggers, helping you identify patterns and make informed decisions.
              
              Supportive Community: Connect with others who are also on the journey to quit tobacco. Share your experiences, seek advice, and provide support to fellow quitters. Our community is a safe space where you can find encouragement and motivation.
              
              Resources and Education: Access a wealth of educational materials and resources to enhance your understanding of tobacco addiction and quitting strategies. Learn about the benefits of quitting, coping mechanisms, and effective techniques to overcome cravings.
              
              Daily Inspiration and Motivation: Receive daily motivational messages, reminders, and tips to stay motivated on your quit journey. We're here to cheer you on and provide the encouragement you need, every step of the way.
              
              Remember, quitting tobacco is a process, and everyone's journey is unique. Our app is here to support you at every stage, whether you're just starting out or have been on the path to quitting for a while.
              
              Commit to a healthier, tobacco-free life today. Download our app and join the thousands of individuals who have successfully quit tobacco with our support.
              
              Together, we can break free from tobacco addiction and embrace a life of better health and well-being.
              
            </p>
            )}
            
          </div>

        <div>
      
    </div>

          <div className='flex-col'>
            <p>PRIVACY POLICY</p>
          </div>

          <div className='user-extra-box'>
            <LogoutBtn profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
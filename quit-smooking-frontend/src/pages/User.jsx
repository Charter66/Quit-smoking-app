import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import LogoutBtn from "../components/LogoutBtn";
import ShareButtons from "../components/ShareButtons";
import "../Styles/User.css";
import { Link, Navigate } from 'react-router-dom';
import Survey from "./Survey";


function Profile() {
  const { profile, fetchUserProfile } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [openAboutUs, setOpenAboutUs] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenAboutUs = () => {
    setOpenAboutUs(!openAboutUs);
  };

  const handleOpenPrivacyPolicy = () => {
    setOpenPrivacyPolicy(!openPrivacyPolicy);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserProfile();
        console.log(profile);
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
          <div className="user-info-box">
            <p>Email: {profile.email}</p>
            <p>Name: {profile.name}</p>
          </div>
        ) : (
          <p>Unable to fetch profile data.</p>
        )}

        <div className="user-container">
          <div className="user-extra-box">
            <button onClick={fetchUserProfile}>REFRESH PROFILE</button>
          </div>

          <div className="user-extra-box">
            <button onClick={toggleDropdown}>TELL A FRIEND</button>
            {isOpen && (
              <div className="dropdown-content user-shareBtn">
                <ShareButtons />
              </div>
            )}
          </div>

          <div className="flex-col">
            <button onClick={handleOpenAboutUs} className="user-textdown">
              ABOUT US
            </button>
            {openAboutUs && (
              <p>
                Welcome to our Quit Somoking App! At our app, we are dedicated
                to helping you on your journey to quit tobacco and embrace a
                healthier lifestyle. We understand that quitting tobacco can be
                challenging, but with the right support and resources, you can
                overcome the addiction and reclaim control of your life. Our app
                is designed to provide you with the tools and guidance you need
                to quit tobacco for good. We offer a variety of features and
                resources to support your journey, including: Personalized Quit
                Plan: Our app helps you create a customized quit plan based on
                your specific needs and preferences. It takes into account
                factors such as your smoking habits, motivation level, and
                triggers to develop a tailored approach to quitting. Tracking
                and Progress Monitoring: Easily track your progress and
                milestones along the way. Our app allows you to log your tobacco
                usage, cravings, and triggers, helping you identify patterns and
                make informed decisions. Supportive Community: Connect with
                others who are also on the journey to quit tobacco. Share your
                experiences, seek advice, and provide support to fellow
                quitters. Our community is a safe space where you can find
                encouragement and motivation. Resources and Education: Access a
                wealth of educational materials and resources to enhance your
                understanding of tobacco addiction and quitting strategies.
                Learn about the benefits of quitting, coping mechanisms, and
                effective techniques to overcome cravings. Daily Inspiration and
                Motivation: Receive daily motivational messages, reminders, and
                tips to stay motivated on your quit journey. We&apos;re here to
                cheer you on and provide the encouragement you need, every step
                of the way. Remember, quitting tobacco is a process, and
                everyone&apos;s journey is unique. Our app is here to support
                you at every stage, whether you&apos;re just starting out or
                have been on the path to quitting for a while. Commit to a
                healthier, tobacco-free life today. Download our app and join
                the thousands of individuals who have successfully quit tobacco
                with our support. Together, we can break free from tobacco
                addiction and embrace a life of better health and well-being.
              </p>
            )}
          </div>

          <div className="flex-col">
            <button onClick={handleOpenPrivacyPolicy} className="user-textdown">
              PRIVACY POLICY
            </button>
            {openPrivacyPolicy && (
              <p>
                At TLP Quit Smoking, we take your privacy and the security of
                your personal information seriously. This Privacy Policy
                outlines how we collect, use, and protect your data when you use
                our quitting smoking app.
                <strong>Information We Collect</strong>
                When you use our app, we may collect certain information to
                provide you with a personalised and seamless experience. The
                types of information we may collect include:
                <ul>
                  <li>
                    * Personal Information: This may include your name, email
                    address, and any additional information you choose to
                    provide when creating an account or using our app&apos;s
                    features.
                  </li>

                  <li>
                    * Usage Data: We collect anonymous usage data to analyse app
                    performance, identify trends, and improve user experience.
                    This may include information such as your device type,
                    operating system, app interactions, and other statistical
                    data.{" "}
                  </li>
                </ul>
                <strong>How We Use Your Information</strong>
                We use the information we collect for various purposes,
                including:
                <ul>
                  <li>
                    * Providing and Improving the App: We use your information
                    to deliver personalised content, track progress, and enhance
                    our app&apos;s features and functionality.
                  </li>

                  <li>
                    * Communication: We may use your email address to send
                    important updates, notifications, and promotional materials
                    related to our app. You have the option to opt out of these
                    communications at any time.
                  </li>

                  <li>
                    * Analytics and Research: We analyse usage data to gain
                    insights into user behaviour, preferences, and trends. This
                    helps us improve our app&apos;s performance, identify areas
                    for enhancement, and make data-driven decisions.
                  </li>
                </ul>
                <strong>Data Security and Protection</strong>
                We employ strict security measures to protect your personal
                information from unauthorised access, disclosure, or alteration.
                We use industry-standard encryption, secure data storage
                practices, and regularly update our security protocols to ensure
                the integrity and confidentiality of your data.
                <strong>Third-Party Services</strong>
                We may utilise third-party services and tools to enhance our
                app&apos;s functionality and provide a seamless user experience.
                These third-party services may have their own privacy policies,
                and we encourage you to review them for a better understanding
                of their data handling practices. We are not responsible for the
                privacy practices or content of these third-party services.
                <strong>Your Choices and Rights</strong>
                You have the right to access, modify, or delete the personal
                information we hold about you. If you wish to exercise these
                rights or have any questions regarding our Privacy Policy,
                please contact us at info@tlp.com
                <strong>Changes to the Privacy Policy</strong>
                We reserve the right to update or modify this Privacy Policy at
                any time. Any changes will be effective upon posting the revised
                policy on our app. We encourage you to review this Privacy
                Policy periodically for any updates. By using our app, you agree
                to the collection, use, and disclosure of your information as
                described in this Privacy Policy.
              </p>
            )}
          </div>

          <div className='user-extra-box'>
            <Link to="/me/survey">EDIT SURVEY</Link>
          </div>

          <div className="user-extra-box">
            <LogoutBtn profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import "../Styles/Dashboard.css";


import SavedMoney from "../components/savedMoney";

//images
import unlocking from '../images/unlocking.png';
import journey from '../images/journey.png';

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

// Popup
import Popup from "reactjs-popup";
import "../styles/Popup.css";

function Dashboard() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const { profile, fetchUserProfile } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, setLoggedIn} = useContext(ProfileContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserProfile();
        setLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoading]);

  const closePopup = () => {
    setButtonPopup(false);
  };

  return (
    <div>
      <div className="background-dashboard">
        <div className="wrapper-dashboard">
          {isLoading ? (
            <div className="form-box-dashboard">
              <p>Loading profile...</p>
            </div>
          ) : profile ? (
            <div className="form-box-dashboard">
              <h2 className="dashboard-h2">Good morning {profile.name},</h2>
              <p>You are doing great!</p>
              <SavedMoney />
            <div className="input-box-dashboard">
                <span className="icon-dashboard">
                  <FontAwesomeIcon icon={faCoins} name="password" />
                </span>
                <label>
                  You saved: <p>€ 500.00</p>
                </label>
            </div>

            <div className="input-box-dashboard">
                <span className="icon-dashboard">
                  <FontAwesomeIcon icon={faCalendarDays} name="password" />
                </span>
                <label>
                  You have been smoke free for:<p>98 days</p>
                </label>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="background-articles">

        <div>
          <div className ="form-box-article">
            <h2 className="article-h2">Unlocking the Path to Freedom:</h2>
          </div>
          <div className="wrapper-articles">
            <img src={unlocking} width="100" height="50" className="article-image1"></img>
            <p>
              Quitting smoking is not merely an act of giving up a harmful
              habit; it is an act of self-love and empowerment. As you leave
              behind the shackles of addiction, you free yourself ...
              <button onClick={() => setButtonPopup(true)}>read more</button>
            </p>
          </div>
        </div>
      </div>

      <div>
      <Popup open={buttonPopup} onClose={closePopup} modal closeOnDocumentClick>
        <div className="popup-content">
          <div className="popup-header">
            <button className="close-button" onClick={closePopup}>
              X
            </button>
          </div>

          <div className="popup-body">
          <h2>Unlocking the Path to Freedom:</h2>
            <p>
              Quitting smoking is not merely an act of giving up a harmful
              habit; it is an act of self-love and empowerment. As you leave
              behind the shackles of addiction, you free yourself from the
              constraints that have held you back. Each day, as you resist the
              urge to smoke, you reclaim control over your life and make space
              for incredible changes.
            </p>

            <h2>A Breath of Fresh Air:</h2>
            <p>
              Imagine the sensation of taking a deep breath without the heavy
              burden of smoke-filled lungs. The moment you quit smoking, your
              respiratory system begins to repair itself. With each passing day,
              your lung capacity expands, enabling you to inhale the freshness
              of life. Feel the invigorating rush of air as it fills your
              revitalized lungs, and savor the newfound freedom in each breath.
            </p>

            <h2>Embracing Vitality:</h2>
            <p>
              Your decision to quit smoking sets in motion a series of
              remarkable transformations within your body. Say goodbye to the
              fatigue and lethargy that often accompanied your smoking days. As
              your cardiovascular health improves, your energy levels soar,
              granting you the ability to fully embrace life&apos;s adventures.
              Unleash your potential, seize the day, and unlock the vibrant
              energy that has long been dormant within you.
            </p>
          </div>
        </div>
      </Popup>
      </div>

      


      <div className="background-articles">
        <div>
          <div className ="form-box-article">
            <h2 className="article-h2">Journey of Resilience:</h2>
          </div>
          <div className="wrapper-articles">
            <img src={journey} width="100" height="50" className="article-image2"></img>
            <p>
            Life is not without its challenges, but with each hurdle you overcome, your resilience grows stronger. Draw inspiration from your own determination and ...
              <button onClick={() => setButtonPopup(true)}>read more</button>
            </p>
          </div>
        </div>
      </div>

     






    </div>
  );
}

export default Dashboard;

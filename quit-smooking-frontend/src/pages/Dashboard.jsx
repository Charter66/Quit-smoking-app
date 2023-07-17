import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import "../styles/Dashboard.css";
import Initials from "../components/Initials";
import unlocking from "../images/unlocking.png";
import journey from "../images/journey.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const { profile, fetchUserProfile, isLoggedIn, setLoggedIn, isLoading, setIsLoading } = useContext(ProfileContext);
  const currency = localStorage.getItem('currency')
  const [openReadMe1, setOpenReadMe1] = useState(false);
  const [openReadMe2, setOpenReadMe2] = useState(false);
  const [daysPassed, setDaysPassed] = useState(0);

  function capitalizeFirstLetter(string) {
    const words = string.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(" ");
  }
  
  function getGreeting() {
    const currentHour = new Date().getHours();
    let greeting = "";
  
    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }
  
    return greeting;
  }

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

  useEffect(() => {
    const quitDate = new Date(profile && profile.smokingHabit && profile.smokingHabit.quitDate);
    const currentDate = new Date();
    const timeDiff = Math.abs(quitDate.getTime() - currentDate.getTime());
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    console.log(days)
    setDaysPassed(days);
  }, [profile]);

  const handleOpenReadMe1 = () => {
    setOpenReadMe1(!openReadMe1);
  };

  const handleOpenReadMe2 = () => {
    setOpenReadMe2(!openReadMe2);
  };

  return (
    <div>
      <div className="dashboard-initials">
        <Initials />
      </div>
      {!profile ? (
        <div>
          <p>Loading profile...</p>
        </div>
      ) : profile ? (
        <div className="form-box-dashboard">
          <div className="dashboard-good-morning">
            <strong>
              <h2 id="greeting">{getGreeting()} {capitalizeFirstLetter(profile.name)}</h2>
            </strong>
            <p>You are doing great!</p>
          </div>

          <div className="dashboard-container">
            <div className="input-box-dashboard">
              <span className="icon-dashboard">
                <FontAwesomeIcon icon={faCoins} name="coins" />
              </span>
              <label>
                You saved:{" "}
                <p>
                  <strong>
                    {profile && profile.savedMoney && profile.savedMoney.toFixed(2)} {profile.smokingHabit.selectedCurrency}
                  </strong>
                </p>
              </label>
            </div>

            <div className="input-box-dashboard">
              <span className="icon-dashboard">
                <FontAwesomeIcon icon={faCalendarDays} name="calendar" />
              </span>
              <label>
                You have been smoke free for:
                <p>
                  <strong>{daysPassed} days</strong>
                </p>
              </label>
            </div>
          </div>
        </div>
      ) : null}

      <div className="background-articles flex flex-col">
        <div>
          <div className="form-box-article space-x-14">
            <h2>Unlocking the Path to Freedom:</h2>
            <img
              src={unlocking}
              width="100"
              height="50"
              className="article-image"
              alt="Unlocking the Path to Freedom"
            />
          </div>
        </div>

        <div className="wrapper-articles">
          <p>
            Quitting smoking is not merely an act of giving up a harmful habit;
            it is an act of self-love and empowerment. As you leave behind the
            shackles of addiction, you free yourself ...
            <button onClick={handleOpenReadMe1} className="dashboard-article">
              read more
            </button>
            {openReadMe1 && (
              <div>
                <br />
                <h2><strong>Unlocking the Path to Freedom:</strong></h2>
                <p>
                  Quitting smoking is not merely an act of giving up a harmful
                  habit; it is an act of self-love and empowerment. As you leave
                  behind the shackles of addiction, you free yourself from the
                  constraints that have held you back. Each day, as you resist
                  the urge to smoke, you reclaim control over your life and make
                  space for incredible changes.
                </p>
                <br />

                <h2><strong>A Breath of Fresh Air:</strong></h2>
                <p>
                  Imagine the sensation of taking a deep breath without the
                  heavy burden of smoke-filled lungs. The moment you quit
                  smoking, your respiratory system begins to repair itself. With
                  each passing day, your lung capacity expands, enabling you to
                  inhale the freshness of life. Feel the invigorating rush of
                  air as it fills your revitalized lungs, and savor the newfound
                  freedom in each breath.
                </p>
                <br />

                <h2><strong>Embracing Vitality:</strong></h2>
                <p>
                  Your decision to quit smoking sets in motion a series of
                  remarkable transformations within your body. Say goodbye to
                  the fatigue and lethargy that often accompanied your smoking
                  days. As your cardiovascular health improves, your energy
                  levels soar, granting you the ability to fully embrace
                  life&apos;s adventures. Unleash your potential, seize the day,
                  and unlock the vibrant energy that has long been dormant
                  within you.
                </p>
              </div>
            )}
          </p>
        </div>
      </div>

      <div className="background-articles flex flex-col">
        <div>
          <div className="form-box-article space-x-14">
            <h2>Journey of Resilience:</h2>
            <img
              src={journey}
              width="100"
              height="50"
              className="article-image"
              alt="Journey of Resilience"
            />
          </div>
        </div>

        <div className="wrapper-articles">
          <p>
            Life is not without its challenges, but with each hurdle you overcome, your resilience grows stronger. Draw inspiration from your own determination and ...
            <button onClick={handleOpenReadMe2} className="dashboard-article">
              read more
            </button>
            {openReadMe2 && (
              <p>
                <br />
                <h2><strong>A Journey of Resilience:</strong></h2>
                <p>
                  The path to a smoke-free life is not without its challenges,but with each hurdle you overcome, your resilience grows stronger. Draw inspiration from your own determination and the countless success stories of those who have embarked on this journey before you. Remember, you are not alone. Reach out for support, lean on loved ones, and celebrate every small victory along the way.
                </p>
                <br />

                <h2><strong>A Legacy of Inspiration:</strong></h2>
                <p>
                  By quitting smoking, you pave the way for a legacy of inspiration. Your journey becomes a beacon of hope for those who still battle the chains of addiction. Share your story, uplift others, and stand as a testament to the power of the human spirit. Your triumph over smoking becomes a source of encouragement for countless souls yearning to break free.
                </p>
              </p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

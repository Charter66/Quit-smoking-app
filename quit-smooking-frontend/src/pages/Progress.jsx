import React, { useContext, useState, useEffect } from "react";
import ProgressCircle from "../components/ProgressCircle";
import { ProfileContext } from "../context/ProfileContext";
import "../styles/Progress.css";


//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmoking,
  faCoins,
  faHourglass,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";

const Progress = () => {
  const [days, setDays] = useState(0);
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [cigarettes, setCigarettes] = useState(0);
  const [moneySpent, setMoneySpent] = useState(0);
  const [currency, setCurrency] = useState("");

  const [threeWeeksPercentage, setThreeWeeksPercentage] = useState(0);
  const [monthPercentage, setMonthPercentage] = useState(0);
  const [yearPercentage, setYearPercentage] = useState(0);
  const { profile, fetchUserProfile } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(true);
  const [daysSmokeFree, setDaysSmokeFree] = useState(0)
  


  useEffect(() => {
    const accumulatedTime = () => {
      try {
        if (
          profile &&
          profile.smokingHabit &&
          profile.smokingHabit.quitDate &&
          profile.smokingHabit.startSmokingDate
        ) {
          const quitDate = new Date(profile.smokingHabit.quitDate);
          const startDate = new Date(profile.smokingHabit.startSmokingDate);
          const currentDate = new Date();

          // finding how many days have passed...
          const timeDiff = Math.abs(currentDate.getTime() - quitDate.getTime());
          const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24));

          // finding how many cigarettes were smoked
          const cigarettesSmoked =
            profile.smokingHabit.cigarettesPerDay * daysPassed;

          // finding how much money was spent
          const cigaretesInPackage = profile.smokingHabit.cigarettesInPackage;
          const packageCost = profile.smokingHabit.packageCost;
            
          const totalMoneySpent =
            (cigarettesSmoked / cigaretesInPackage) * packageCost;

          // finding the hours passed without smoking
          const millisecondsPassed = currentDate - quitDate;
          const hoursPassed = Math.ceil(millisecondsPassed / (1000 * 60 * 60));

          // finding how many years have been lost
          const timeDiffYear = quitDate.getTime() - startDate.getTime();
          const yearsPassed = Math.floor(
            timeDiffYear / (1000 * 60 * 60 * 24 * 365)
          );

          // finding how many months have been lost
          const monthsPassed =
            (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
            (currentDate.getMonth() - startDate.getMonth());

          // finding life expectancy lost
          // Every cigarette a man smokes reduces his life by 11 minutes.

          const minutesPassed = Math.floor(daysPassed * 24 * 60);
          const minLost = cigarettesSmoked * 11;

          // Calculate the number of days, hours, and minutes
          const daysLost = Math.floor(minLost / (60 * 24));
          const hoursLost = Math.floor((minLost % (60 * 24)) / 60);
          const minutesLost = minLost % 60;

          // Calculate the number of years and months from the daysLost
          const yearsLost = Math.floor(daysLost / 365);
          const monthsLost = Math.floor((daysLost % 365) / 30);
          const remainingDaysLost = (daysLost % 365) % 30;

          // percentage for 3 
          // const timeDiffCurrent = Math.abs(currentDate.getTime() - quitDate.getTime());
          // const daysPassedCurrent = Math.ceil(timeDiffCurrent / (1000 * 3600 * 24));
          const numeratorDays = daysPassed;
          console.log(daysPassed)
          const denominator = 90;
          let percentage = (numeratorDays / denominator) * 100;
          percentage = Math.min(percentage, 100);
          console.log(numeratorDays)

          // percentage for one month
          const denominatorMonth = 30;
          let percentageMonth = (numeratorDays / denominatorMonth) * 100;
          percentageMonth = Math.min(percentageMonth, 100);

          // percentage for one year
          const denominatorYear = 365;
          let percentageYear = (numeratorDays / denominatorYear) * 100;
          percentageYear = Math.min(percentageYear, 100); 

          // currency
          const profileCurrency = profile.smokingHabit.selectedCurrency;

          // setting the states
          setThreeWeeksPercentage(percentage);
          setMonthPercentage(percentageMonth);
          setYearPercentage(percentageYear);

          setYears(yearsLost);
          setMonths(monthsLost);
          setDays(remainingDaysLost);
          setCigarettes(cigarettesSmoked);
          setMoneySpent(totalMoneySpent);
          setCurrency(profileCurrency);
          setDaysSmokeFree(daysPassed)

          localStorage.setItem("monthPercentage", percentageMonth);
          localStorage.setItem("threeWeeksPercentage", percentage);
          localStorage.setItem("yearPercentage", percentageYear);
        }
      } catch (error) {
        console.error("Error cauculating the progress:", error);

      }
    };

    const fetchData = async () => {
      try {
        await fetchUserProfile();
        accumulatedTime();
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <p>Loading profile...</p>
        </div>
      ) : profile ? (
        <div>
          <div className="progress-container">
            <div className="progress-wrapper flex flex-col items-center content-evenly">
              <div className="progress-text">
                <h2 className="progress-headline">Improved lung function:</h2>
                <p>
                  In between 2 weeks – 3 months your lung function starts to
                  improve. Your lung function begins to improve. Your lung
                  capacity increases, making it easier to breathe and engage in
                  physical activities.
                </p>
                 <div className="m-14">
                    <ProgressCircle progress={threeWeeksPercentage.toFixed()}/>
                  </div>
              </div>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-wrapper flex flex-col items-center content-evenly">
              <div className="progress-text">
                <h2 className="progress-headline">
                  Reduced risk of respiratory infections:
                </h2>
                <p>
                  Quitting smoking lowers your susceptibility to respiratory
                  infections. Your respiratory system becomes healthier and
                  better equipped to fight off infections.
                </p>  
              </div> 
              <div className="m-6">
                    <ProgressCircle progress={monthPercentage.toFixed()}/>
              </div>            
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-wrapper flex flex-col items-center content-evenly">
              <div className="progress-text">
                <h2 className="progress-headline">
                  Enhanced cardiovascular health:
                </h2>
                <p>
                  Your blood pressure and heart rate normalize, improving blood
                  circulation and reducing the strain on your cardiovascular
                  system.
                </p>
              </div>
              <div className="m-14">
                    <ProgressCircle progress={yearPercentage.toFixed()}/>
              </div>
            </div>
          </div>

          {/* Bottom container */}
        <div className="progress-period>">
          <div className="progress-container-period">
            <div className="progress-extra-box">
            <h3><strong>During your period of smoking:</strong></h3>
            </div>
          </div>

            <div className="progress-container-period">
              
              <p>You lost {years > 0 ? `${years} years` : null} {months > 0 ? `${months} months and` : null}  {days} days off your life expectancy</p>

              <span className="icon-progress">
                <FontAwesomeIcon className="progress-icon-color" icon={faHourglass} name="password" />
              </span>
            </div>


          <div className="progress-container-period">

           
              <p>You smoked {cigarettes.toLocaleString()} cigarettes</p>
            

            <span className="icon-progress">
                <FontAwesomeIcon className="progress-icon-color" icon={faSmoking} name="cigarettes" />
            </span>
          </div>

          <div className="progress-container-period">
                <p>You spent {moneySpent.toLocaleString()} {currency}</p>

            <span className="icon-progress">
                <FontAwesomeIcon className="progress-icon-color" icon={faCoins} name="money" />
              </span>
          </div>
        </div>

          {/* Unlocked achievements */}
          <div className={ daysSmokeFree >= 1 ? "progress-container" : "progress-container-uncompleted"}>
            <p>1 day smoke free!</p>
            <span className="icon-progress">
              {daysSmokeFree >= 1 ? (
                <FontAwesomeIcon icon={faUnlock} />
              ) : (
                <FontAwesomeIcon icon={faLock} />
              )}
            </span>
          </div>

          <div className={ daysSmokeFree >= 10 ? "progress-container" : "progress-container-uncompleted"}>
            <p>10 days' smoke free!</p>
            <span className="icon-progress">
              {daysSmokeFree >= 10 ? (
                <FontAwesomeIcon icon={faUnlock} />
              ) : (
                <FontAwesomeIcon icon={faLock} />
              )}
            </span>
          </div>

          <div className={ daysSmokeFree >= 30 ? "progress-container" : "progress-container-uncompleted"}>
            <p>1 month smoke free!</p>
            <span className="icon-progress">
              {daysSmokeFree >= 30 ? (
                <FontAwesomeIcon icon={faUnlock} />
              ) : (
                <FontAwesomeIcon icon={faLock} />
              )}
            </span>
          </div>

          {/* Locked achievements */}
          <div className={ daysSmokeFree >= 90 ? "progress-container" : "progress-container-uncompleted"}>
            <p>3 months smoke free!</p>
            <span className="icon-progress">
              {daysSmokeFree >= 90 ? (
                <FontAwesomeIcon icon={faUnlock} />
              ) : (
                <FontAwesomeIcon icon={faLock} />
              )}
            </span>
          </div>

          <div className={ daysSmokeFree >= 182 ? "progress-container" : "progress-container-uncompleted"}>
            <p>6 months smoke free!</p>
            <span className="icon-progress">
              {daysSmokeFree >= 180 ? (
                <FontAwesomeIcon icon={faUnlock} />
              ) : (
                <FontAwesomeIcon icon={faLock} />
              )}
            </span>
          </div>

          <div className={ daysSmokeFree >= 365 ? "progress-container" : "progress-container-uncompleted"}>
            <p>1 year smoke free!</p>
            <span className="icon-progress">
              {daysSmokeFree >= 365 ? (
                <FontAwesomeIcon icon={faUnlock} />
              ) : (
                <FontAwesomeIcon icon={faLock} />
              )}
            </span>
          </div>
        </div>
      ) : (
        <div className="progress-container">
          <p>No profile found.</p>
        </div>
      )}
    </div>
  );
};

export default Progress;
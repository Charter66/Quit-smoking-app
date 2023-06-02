import React, { useContext, useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import { ProfileContext } from "../context/ProfileContext";
import "../Styles/Progress.css";

//Chart
import DoughnutChart from "../components/DoughnutChart.jsx";

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
  
//Doughnut Chart
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    setProgress(true);
  }, []);

  // Chart
  const chartData = {
    dataPoints: [
      { name: "not finished", y: 100 },
      { name: "finished", y: 300 },
    ],
  };

  const totalDataPoints = chartData.dataPoints.reduce(
    (total, dataPoint) => total + dataPoint.y,
    0
  );
  const collectedDataPoints = chartData.dataPoints.find(
    (dataPoint) => dataPoint.name === "finished"
  ).y;

  const positivePercentage = (
    (collectedDataPoints / totalDataPoints) *
    100
  ).toFixed(1);

  chartData.positivePercentage = positivePercentage;

  // Modify the color of the doughnut chart sections
  chartData.dataPoints = chartData.dataPoints.map((dataPoint) => {
    if (dataPoint.name === "finished") {
      return {
        ...dataPoint,
        color: "#66bec7", // Change the color to the desired color for the 'finished' section
      };
    } else {
      return {
        ...dataPoint,
        color: "#FFF", // Change the color to the desired color for other sections
      };
    }
  });

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
          const timeDiff = Math.abs(startDate.getTime() - quitDate.getTime());
          const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24));
          console.log(daysPassed);

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
          console.log(hoursPassed);

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

          // percentage for 3 weeks
          const timeDiffCurrent = Math.abs(currentDate.getTime() - quitDate.getTime());const daysPassedCurrent = Math.ceil(timeDiffCurrent / (1000 * 3600 * 24));
          const numeratorDays = daysPassedCurrent;
          const denominator = 21;
          let percentage = (numeratorDays / denominator) * 100;
          percentage = Math.min(percentage, 100);

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
          console.log(percentageYear)
          setYears(yearsLost);
          setMonths(monthsLost);
          setDays(remainingDaysLost);
          setCigarettes(cigarettesSmoked);
          setMoneySpent(totalMoneySpent);
          setCurrency(profileCurrency);

          localStorage.setItem("monthPercentage", percentageMonth);
          localStorage.setItem("threeWeeksPercentage", percentage);
          localStorage.setItem("yearPercentage", percentageYear);
        }
      } catch (error) {
        console.error("Error calculating save money:", error);
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
            <div className="progress-wrapper">
              <div className="progress-text">
                <h2 className="progress-headline">Improved lung function:</h2>
                <p>
                  In between 2 weeks – 3 months your lung function starts to
                  improve. Your lung function begins to improve. Your lung
                  capacity increases, making it easier to breathe and engage in
                  physical activities.
                </p>
              </div>

              <div
                className="progress-chart"
                style={{ width: "200px", height: "200px" }}
              >
                <DoughnutChart
                  chartData={chartData}
                  importanteNumber={threeWeeksPercentage}
                  percent={threeWeeksPercentage.toFixed(0)}
                  hidePercentage={true}
                />
              </div>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-wrapper">
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

              <div
                className="progress-chart"
                style={{ width: "200px", height: "200px" }}
              >
                <DoughnutChart
                  chartData={chartData}
                  importanteNumber={monthPercentage}
                  percent={monthPercentage.toFixed(2)}
                  hidePercentage={true}
                  />
              </div>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-wrapper">
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
              <div
                className="progress-chart"
                style={{ width: "200px", height: "200px" }}
                >
                <DoughnutChart
                  chartData={chartData}
                  importanteNumber={yearPercentage}
                  percent={yearPercentage.toFixed(2)}
                  hidePercentage={true}
                />
              </div>
            </div>
          </div>

          {/* Bottom container */}
          <div className="progress-container">
            <div className="progress-extra-box"></div>

            <h3>During your period of smoking:</h3>

            <div className="progress-extra-box">
              <span className="icon-progress">
                <FontAwesomeIcon className="progress-icon-color" icon={faHourglass} name="password" />
              </span>
              <p>
                You lost {years} year {months} months and {days} days off your
                life expectancy
              </p>
            </div>

            <div className="progress-extra-box">
              <span className="icon-progress">
                <FontAwesomeIcon className="progress-icon-color" icon={faSmoking} name="password" />
              </span>
              <p>You smoked {cigarettes} cigarettes</p>
            </div>

            <div className="progress-extra-box">
              <span className="icon-progress">
                <FontAwesomeIcon className="progress-icon-color" icon={faCoins} name="password" />
              </span>
              <p>
                You spent {moneySpent} {currency}
              </p>
            </div>
          </div>

          {/* Unlocked achievements */}
          <div className="progress-container">
            <span className="icon-progress">
              <FontAwesomeIcon icon={faUnlock} />
            </span>
            <p>1 day smoke free!</p>
          </div>

          <div className="progress-container">
            <span>
              <FontAwesomeIcon icon={faUnlock} />
            </span>
            <p>10 days' smoke free!</p>
          </div>

          <div className="progress-container">
            <span>
              <FontAwesomeIcon icon={faUnlock} />
            </span>
            <p>1 month smoke free!</p>
          </div>

          {/* Locked achievements */}
          <div className="progress-container">
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <p>3 months smoke free!</p>
          </div>

          <div className="progress-container">
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <p>6 months smoke free!</p>
          </div>

          <div className="progress-container">
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <p>1 year smoke free!</p>
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
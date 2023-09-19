import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Styles from "./LaunchDetails.module.css";
import formatDate from "../../utils/DateFormatter";

const LaunchDetails = () => {
  const [launch, setLaunch] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  const location = useLocation();
  const { launchData } = location.state;

  useEffect(() => {
    setLaunch(launchData);

    const favoriteStatus = localStorage.getItem(`favorite_${launchData.id}`);
    if (favoriteStatus) {
      setIsFavorite(JSON.parse(favoriteStatus));
    }
  }, [launchData]);

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    localStorage.setItem(
      `favorite_${launchData.id}`,
      JSON.stringify(newFavoriteStatus)
    );
  };

  return (
    <>
      <div className={Styles.MainWrapper}>
        {launch.links?.patch.small ? (
          <img
            className={Styles.Image}
            src={launch.links.patch.small}
            alt={launch.name}
          />
        ) : (
          "N/A"
        )}
        <div className={Styles.Wrapper}>
          <h2>{launch.name}</h2>
          <div>
            <strong>Date:</strong> {formatDate(launch.date_utc || null)}
          </div>
          {(launch.success === true || launch.success === false) && (
            <div>
              <strong>Status: </strong>
              {launch.success === true ? "Success! 🚀" : "Failed 🙁"}
            </div>
          )}
          {launch?.details && (
            <div>
              <strong>Details:</strong> {launch?.details}
            </div>
          )}
          <div>
            {launch.links?.webcast ? (
              <a target="_blank" rel="noreferrer" href={launch.links.webcast}>
                Video:
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <div className={Styles.ButtonWrap}>
        <Link className={Styles.Back} to={"/"}>
          Back
        </Link>
        <button className={Styles.ToggleButton} onClick={toggleFavorite}>
          {!isFavorite ? "Add to favorite" : "Remove from favorite"}
        </button>
      </div>
    </>
  );
};

export default LaunchDetails;

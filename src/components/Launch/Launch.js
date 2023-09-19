// import { Link } from "react-router-dom";
import formatDate from "../../utils/DateFormatter";
import Styles from "./Launch.module.css";
import { useNavigate } from "react-router-dom";

const Launch = ({ launches, setLaunchesFunc, sortedLaunches }) => {
  const navigate = useNavigate();

  const toggleFavorite = (launchId) => {
    const updatedLaunches = launches.map((launch) => {
      if (launch.id === launchId) {
        const newFavoriteStatus = !launch.isFavorite;
        launch.isFavorite = newFavoriteStatus;
        localStorage.setItem(
          `favorite_${launch.id}`,
          JSON.stringify(newFavoriteStatus)
        );
      }
      return launch;
    });
    setLaunchesFunc(updatedLaunches);
  };

  const handleRowClick = (e, launch) => {
    if (e.target.localName !== "td") return;
    navigate(`/launch/${launch.id}`, { state: { launchData: launch } });
  };

  return sortedLaunches.map((launch) => (
    <tr key={launch.id} onClick={(e) => handleRowClick(e, launch)}>
      <td>
        {launch.name} {launch.isFavorite ? "❤️" : ""}
      </td>
      <td>{launch.flight_number ? launch.flight_number : null}</td>
      <td>{formatDate(launch.date_utc || null)}</td>
      <td>
        {launch.links.patch.small ? (
          <img
            className={Styles.Image}
            src={launch.links.patch.small}
            alt={launch.name}
          />
        ) : (
          "🤷‍♂️"
        )}
      </td>
      <td>
        <label>
          Favorite:
          <input
            type="checkbox"
            checked={launch.isFavorite}
            onChange={() => toggleFavorite(launch.id)}
          />
        </label>
      </td>
    </tr>
  ));
};

export default Launch;

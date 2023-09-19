import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./LaunchTable.module.css";
import Launch from "../Launch/Launch";

const LaunchTable = () => {
  const [loading, setLoading] = useState(true);
  const [launches, setLaunches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [launchesPerPage] = useState(10);
  const [maxPage, setMaxPage] = useState(1);
  const [sortKey, setSortKey] = useState("date_utc");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.spacexdata.com/v4/launches")
      .then((response) => {
        const data = response.data;
        setMaxPage(Math.ceil(response.data.length / launchesPerPage));

        const updatedLaunches = data.map((launch) => {
          const favoriteStatus = localStorage.getItem(`favorite_${launch.id}`);
          if (favoriteStatus) {
            launch.isFavorite = JSON.parse(favoriteStatus);
          } else {
            launch.isFavorite = false;
          }
          return launch;
        });
        setLaunches(updatedLaunches);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [launchesPerPage]);

  function handleNextPage(e) {
    e.preventDefault();
    if (currentPage === maxPage) return;
    setCurrentPage(() => currentPage + 1);
  }

  function handlePreviousPage(e) {
    e.preventDefault();
    if (currentPage <= 1) return;
    setCurrentPage(() => currentPage - 1);
  }

  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = launches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  const sortedLaunches = currentLaunches
    .sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    })
    .filter((launch) =>
      launch.name.toLowerCase().includes(filterText.toLowerCase())
    );

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (loading) return;

  return (
    <div className={Styles.MainWrap}>
      <input
        className={Styles.SortInput}
        type="text"
        placeholder="Type something to filter by launch name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th>Flight number</th>
            <th onClick={() => handleSort("date_utc")}>Date</th>
            <th>Rocket Image</th>
            <th>Toggle favorite</th>
          </tr>
        </thead>
        <tbody>
          {launches.length ? (
            <Launch
              launches={launches}
              setLaunchesFunc={setLaunches}
              sortedLaunches={sortedLaunches}
            />
          ) : null}
        </tbody>
      </table>

      <div className={Styles.ButtonWrap}>
        <button className={Styles.Button} onClick={handlePreviousPage}>
          Previous
        </button>
        <div>{`Page ${currentPage}`}</div>
        <button className={Styles.Button} onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default LaunchTable;

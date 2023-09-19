// import React from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import { gql } from "graphql-tag";

// const LAUNCH_QUERY = gql`
//   query GetLaunch($id: ID!) {
//     launch(id: $id) {
//       mission_name
//       launch_date_utc
//       rocket {
//         rocket_name
//       }
//     }
//   }
// `;

// function LaunchDetails() {
//   const { id } = useParams();
//   const { loading, error, data } = useQuery(LAUNCH_QUERY, {
//     variables: { id },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const launch = data.launch;

//   return (
//     <div>
//       <h1>{launch.mission_name}</h1>
//       <p>Launch Date: {launch.launch_date_utc}</p>
//       <p>Rocket Name: {launch.rocket.rocket_name}</p>
//     </div>
//   );
// }

// export default LaunchDetails;

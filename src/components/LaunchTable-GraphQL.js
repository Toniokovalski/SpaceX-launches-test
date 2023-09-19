// import React from "react";
// import { useQuery } from "@apollo/client";
// import { Link } from "react-router-dom";
// import { gql } from "graphql-tag";

// const LAUNCHES_QUERY = gql`
//   query GetLaunches {
//     launches {
//       id
//       mission_name
//       launch_date_utc
//     }
//   }
// `;

// function LaunchTable() {
//   const { loading, error, data } = useQuery(LAUNCHES_QUERY);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;
//   console.log(data);
//   return (
//     <div>
//       <h1>Rocket Launches</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Mission Name</th>
//             <th>Launch Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.launches.map((launch) => (
//             <tr key={launch.id}>
//               <td>{launch.id}</td>
//               <td>
//                 <Link to={`/launch/${launch.id}`}>{launch.mission_name}</Link>
//               </td>
//               <td>{launch.launch_date_utc}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default LaunchTable;

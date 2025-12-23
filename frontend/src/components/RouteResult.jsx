import React from "react";

const RouteResult = ({ routeData }) => {
  if (!routeData) return null;

  return (
    <div>
      <h2>Route</h2>
      <p>Total Time: {routeData.totalTime} mins</p>
      <ol>
        {routeData.route.map((stop, index) => (
          <li key={index}>
            {stop.station} 
            {stop.line ? ` (${stop.line})` : ""}
            {stop.interchange ? " 🔄" : ""}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RouteResult;

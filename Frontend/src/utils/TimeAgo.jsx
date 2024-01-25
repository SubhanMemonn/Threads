// TimeAgo.js
import React from "react";
import { formatDistanceToNow, format } from "date-fns";

const TimeAgo = ({ date }) => {
  const formattedDate = format(new Date(date), "MMMM d, yyyy h:mm a");
  return (
    <span title={formattedDate}>
      {formatDistanceToNow(new Date(date), { addSuffix: true })}
    </span>
  );
};

export default TimeAgo;

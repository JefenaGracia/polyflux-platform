import React, { useState } from "react";
import "../App.css";

export default function HistoryPanel({ actionHistory = [], onHighlight }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <div className="historyPanel">
      <h4 className="historyTitle">Action History</h4>

      {actionHistory.length === 0 ? (
        <p className="historyEmpty">No actions recorded yet.</p>
      ) : (
        <ul className="historyList">
          {actionHistory.map((action, index) => {
            // console.log(`--- action timestamp --- ${action.timestamp}`);
            // Convert timestamp to readable format
            // const formattedTimestamp = action.timestamp?.seconds
            //   ? new Date(action.timestamp.seconds * 1000).toLocaleString()
            //   : "";

            let formattedTimestamp = "Unknown Time";
            if (action.timestamp) {
              if (typeof action.timestamp === "string") {
                formattedTimestamp = new Date(
                  action.timestamp
                ).toLocaleString();
              } else if (action.timestamp.seconds) {
                formattedTimestamp = new Date(
                  action.timestamp.seconds * 1000
                ).toLocaleString();
              }
            }

            console.log(`--- Formatted Timestamp --- ${formattedTimestamp}`);
            const rawAction = action.action || "";
            let actionLabel = rawAction;
            if (action.shapeType) {
              const lower = rawAction.toLowerCase();
              const typeLower = String(action.shapeType).toLowerCase();
              if (!lower.includes(typeLower)) {
                actionLabel = `${rawAction} a ${action.shapeType}`;
              }
            }

            return (
              <li
                key={index}
                className={`historyItem ${
                  selectedIndex === index ? "historyItem--selected" : ""
                }`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedIndex(index);
                  const rawId = action.targetId || action.shapeId;
                  console.log("[HistoryPanel] clicked action:", action);
                  console.log("[HistoryPanel] rawId:", rawId);
                  if (onHighlight && rawId) {
                    onHighlight(rawId);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedIndex(index);
                    const rawId = action.targetId || action.shapeId;
                    if (onHighlight && rawId) {
                      onHighlight(rawId);
                    }
                  }
                }}
              >
                <strong>{action.userId || "Unknown User"}</strong>{" "}
                {actionLabel}
                {/* {action.action}
                {action.shapeType}
                {/* {action.shapeId} */}
                <div className="timestamp">{formattedTimestamp}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

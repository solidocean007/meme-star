// ActivityFeed.tsx
import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";

const MemeFeed: React.FC = ({ memes }) => {
  return (
    <div className="activity-feed-box">
      <List
        height={600}
        width={300}
        itemSize={120}
        itemCount={memes.length}
        itemData={memes}
      >
        {({ index, style }) => (
          <div style={style}>
            <img src={memes[index].imageUrl} alt={`Meme ${index}`} />
          </div>
        )}
      </List>
    </div>
  );
};

export default MemeFeed;

import React, { useEffect, useState } from 'react';
import { api } from './api';
import { BadgeCard } from './BadgeCard';

export const BadgeList: React.FC = () => {
  const [badges, setBadges] = useState<any[]>([]);

  useEffect(() => {
    api.get('/badges')
      .then(res => {
        setBadges(res.data) 
        // console.log('Fetched badges:', res.data);
    })
      .catch(err => console.error('Error fetching badges:', err));
  }, []);

  return (
    <div>
      <h2>Saved Badges</h2>
      {badges.length === 0 && <p>No badges found.</p>}
      {badges.map(({ filename, badge }, index) => (
        <div key={index}>
          <h4>{filename}</h4>
          <BadgeCard badge={badge} />
        </div>
      ))}
    </div>
  );
};

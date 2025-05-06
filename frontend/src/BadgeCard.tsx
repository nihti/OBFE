import React from 'react';

interface BadgeCardProps {
  badge: any;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  if (!badge) return null;

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
      <h2>{badge.badge.name}</h2>
      <p><strong>Description:</strong> {badge.badge.description}</p>
      <p><strong>Issuer:</strong> {badge.badge.issuer.name}</p>
      <p><strong>Recipient:</strong> {badge.recipient.identity}</p>
      <p><strong>Issued On:</strong> {badge.badge.issuedOn}</p>
    </div>
  );
};

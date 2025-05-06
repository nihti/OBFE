import React from 'react';
import { useForm } from 'react-hook-form';
import { BadgeCard } from './BadgeCard';
import { api } from './api';

interface BadgeFormValues {
  name: string;
  description: string;
  issuer: string;
  recipient: string;
  issuedOn: string;
}

export const BadgeForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<BadgeFormValues>();
  const [badge, setBadge] = React.useState<any | null>(null);

  const onSubmit = async (data: BadgeFormValues) => {
    const badgeObject = {
      "@context": "https://w3id.org/openbadges/v2",
      type: "Assertion",
      recipient: {
        type: "email",
        identity: data.recipient
      },
      badge: {
        name: data.name,
        description: data.description,
        issuer: { name: data.issuer },
        issuedOn: data.issuedOn
      }
    };
  
    setBadge(badgeObject);
  
    try {
      const response = await api.post('/badge', badgeObject);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to save badge:', error);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input {...register('name', { required: 'Badge name is required' })} placeholder="Badge name" />
        {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}

        <input {...register('description', { required: 'Description is required' })} placeholder="Description" />
        {errors.description && <span style={{ color: 'red' }}>{errors.description.message}</span>}

        <input {...register('issuer', { required: 'Issuer name is required' })} placeholder="Issuer name" />
        {errors.issuer && <span style={{ color: 'red' }}>{errors.issuer.message}</span>}

        <input
          {...register('recipient', {
            required: 'Recipient email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address'
            }
          })}
          placeholder="Recipient email"
        />
        {errors.recipient && <span style={{ color: 'red' }}>{errors.recipient.message}</span>}

        <input
          type="date"
          {...register('issuedOn', {
            required: 'Issue date is required',
            validate: value => {
              if (new Date(value) > new Date()) return 'Issue date cannot be in the future';
              return true;
            }
          })}
        />
        {errors.issuedOn && <span style={{ color: 'red' }}>{errors.issuedOn.message}</span>}

        <button type="submit">Generate Badge</button>
      </form>

      {badge && <>
        <pre>{JSON.stringify(badge, null, 2)}</pre>
        <BadgeCard badge={badge} />
      </>}
    </div>
  );
};
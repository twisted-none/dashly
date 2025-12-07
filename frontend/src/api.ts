import { User } from 'oidc-client-ts';

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchServiceItems(serviceId: string, authUser: User | null | undefined) {
  if (!authUser?.access_token) {
    throw new Error('No access token provided');
  }

  const response = await fetch(`${API_URL}/services/${serviceId}`, {
    headers: {
      Authorization: `Bearer ${authUser.access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}
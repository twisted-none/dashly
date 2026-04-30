import { Service, ServiceItem } from './types';

export const api = {
  async getServices(): Promise<Service[]> {
    const response = await fetch('/api/services');
    if (!response.ok) {
      throw new Error('Ошибка при получении списка сервисов');
    }
    return response.json();
  },

  async getServiceItems(serviceId: string): Promise<ServiceItem[]> {
    const response = await fetch(`/api/services/${serviceId}/items`);
    if (!response.ok) {
      throw new Error('Ошибка при получении элементов сервиса');
    }
    return response.json();
  }
};
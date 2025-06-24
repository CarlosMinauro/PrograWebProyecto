import { API_ENDPOINTS } from './config';

// Helper function to get auth headers
export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
export const handleApiResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  
  return data;
};

// Generic API request function
export const apiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const config: RequestInit = {
    headers: getAuthHeaders(),
    ...options,
  };

  const response = await fetch(url, config);
  return handleApiResponse(response);
};

// Re-export API_ENDPOINTS for convenience
export { API_ENDPOINTS }; 
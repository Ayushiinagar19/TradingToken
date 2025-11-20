import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTokenPrice } from '@/store/tokenSlice';

export const useTokenSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Simulate a WebSocket connection
    const interval = setInterval(() => {
      // Randomly pick a Token ID (1, 2, or 3 based on our mock data)
      const randomId = Math.floor(Math.random() * 3) + 1;
      
      // Generate a random new price change
      const randomPriceChange = (Math.random() - 0.5) * 0.1; // Small fluctuation
      
      // Dispatch to Redux
      // In a real app, we would receive this data from the socket
      dispatch(updateTokenPrice({ 
        id: String(randomId), 
        price: Math.abs(randomPriceChange) // Just passing a raw variance for demo
        // Note: In a real app, we'd pass the actual new price. 
        // For this demo, the reducer will handle the logic.
      }));
      
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [dispatch]);
};
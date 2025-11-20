import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number; 
  marketCap: string;      
  liquidity: string;      
  volume: string;         
  txns: { total: number; buys: number; sells: number }; 
  age: string;            
  chartData: number[];    
  holders: number;        
  security: { top10: number; dev: number }; 
  image: string;
  category: 'trending' | 'surge' | 'new'; 
}

interface TokenState {
  items: Token[];
}

// Helper to generate fake chart data
const randomChart = () => Array.from({ length: 20 }, () => Math.random() * 100);

const initialState: TokenState = {
  items: [
    { 
      id: '1', name: 'Lawrence', symbol: 'Jail Lawrence', price: 0.0004, priceChange24h: -7.35, 
      marketCap: '$18K', liquidity: '$17.8K', volume: '$33.1K', 
      txns: { total: 440, buys: 257, sells: 183 }, 
      age: '7m', chartData: randomChart(), holders: 180, security: { top10: 27.82, dev: 0 },
      image: 'https://avatar.vercel.sh/lawrence', category: 'trending'
    },
    { 
      id: '2', name: 'Jail Reed', symbol: 'Jail Reed', price: 0.0021, priceChange24h: 15.11, 
      marketCap: '$16.3K', liquidity: '$17.3K', volume: '$23.3K', 
      txns: { total: 367, buys: 215, sells: 152 }, 
      age: '11m', chartData: randomChart(), holders: 133, security: { top10: 25.17, dev: 3 },
      image: 'https://avatar.vercel.sh/reed', category: 'trending'
    },
    { 
      id: '3', name: 'Molina', symbol: 'Justice For...', price: 0.0009, priceChange24h: 25.32, 
      marketCap: '$8.52K', liquidity: '$12.3K', volume: '$20.7K', 
      txns: { total: 273, buys: 154, sells: 119 }, 
      age: '4m', chartData: randomChart(), holders: 39, security: { top10: 25.54, dev: 0 },
      image: 'https://avatar.vercel.sh/molina', category: 'trending'
    },
    { 
      id: '4', name: 'LIFE', symbol: 'How Life Feels', price: 0.012, priceChange24h: -11.6, 
      marketCap: '$23.5K', liquidity: '$20.7K', volume: '$9.79K', 
      txns: { total: 140, buys: 76, sells: 64 }, 
      age: '37m', chartData: randomChart(), holders: 147, security: { top10: 23.82, dev: 4.77 },
      image: 'https://avatar.vercel.sh/life', category: 'trending'
    },
    // --- NEW ENTRIES BELOW ---
    { 
      id: '5', name: 'Pepe AI', symbol: 'PEPEAI', price: 0.000042, priceChange24h: 124.5, 
      marketCap: '$1.2M', liquidity: '$450K', volume: '$2.1M', 
      txns: { total: 1250, buys: 900, sells: 350 }, 
      age: '1h', chartData: randomChart(), holders: 3420, security: { top10: 12.5, dev: 1.2 },
      image: 'https://avatar.vercel.sh/pepeai', category: 'surge'
    },
    { 
      id: '6', name: 'Solana Summer', symbol: 'SOLSUM', price: 1.45, priceChange24h: 5.2, 
      marketCap: '$560K', liquidity: '$120K', volume: '$89K', 
      txns: { total: 89, buys: 50, sells: 39 }, 
      age: '2d', chartData: randomChart(), holders: 560, security: { top10: 45.0, dev: 0 },
      image: 'https://avatar.vercel.sh/solsum', category: 'trending'
    },
    { 
      id: '7', name: 'Doge 3.0', symbol: 'DOGE3', price: 0.000001, priceChange24h: -32.4, 
      marketCap: '$45K', liquidity: '$12K', volume: '$150K', 
      txns: { total: 800, buys: 200, sells: 600 }, 
      age: '30m', chartData: randomChart(), holders: 120, security: { top10: 60.0, dev: 15 },
      image: 'https://avatar.vercel.sh/doge3', category: 'trending'
    },
    { 
      id: '8', name: 'Matrix Neo', symbol: 'NEO', price: 0.85, priceChange24h: 8.9, 
      marketCap: '$2.5M', liquidity: '$800K', volume: '$500K', 
      txns: { total: 450, buys: 300, sells: 150 }, 
      age: '5h', chartData: randomChart(), holders: 1500, security: { top10: 8.0, dev: 0 },
      image: 'https://avatar.vercel.sh/neo', category: 'trending'
    },
    { 
      id: '9', name: 'Blue Kirby', symbol: 'KIRBY', price: 0.12, priceChange24h: 45.0, 
      marketCap: '$300K', liquidity: '$90K', volume: '$450K', 
      txns: { total: 600, buys: 550, sells: 50 }, 
      age: '15m', chartData: randomChart(), holders: 800, security: { top10: 15.0, dev: 2 },
      image: 'https://avatar.vercel.sh/kirby', category: 'surge'
    },
    { 
      id: '10', name: 'Safe Food', symbol: 'FOOD', price: 0.003, priceChange24h: -2.1, 
      marketCap: '$80K', liquidity: '$40K', volume: '$10K', 
      txns: { total: 45, buys: 20, sells: 25 }, 
      age: '3d', chartData: randomChart(), holders: 210, security: { top10: 30.0, dev: 5 },
      image: 'https://avatar.vercel.sh/food', category: 'trending'
    },
    { 
      id: '11', name: 'Chad Giga', symbol: 'CHAD', price: 4.20, priceChange24h: 69.0, 
      marketCap: '$10M', liquidity: '$2M', volume: '$15M', 
      txns: { total: 5000, buys: 3500, sells: 1500 }, 
      age: '12h', chartData: randomChart(), holders: 8500, security: { top10: 5.0, dev: 0 },
      image: 'https://avatar.vercel.sh/chad', category: 'trending'
    },
    { 
      id: '12', name: 'Rekt Guy', symbol: 'REKT', price: 0.0000001, priceChange24h: -99.0, 
      marketCap: '$1K', liquidity: '$500', volume: '$10K', 
      txns: { total: 200, buys: 5, sells: 195 }, 
      age: '1d', chartData: randomChart(), holders: 50, security: { top10: 90.0, dev: 80 },
      image: 'https://avatar.vercel.sh/rekt', category: 'trending'
    },
  ],
};

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    updateTokenPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const token = state.items.find(t => t.id === action.payload.id);
      if (token) {
        // Update price
        token.price = Number((token.price + action.payload.price).toFixed(6));
        // Update chart (simulating movement)
        token.chartData.shift();
        token.chartData.push(token.price * 10000 + (Math.random() * 100)); 
      }
    },
  },
});

export const { updateTokenPrice } = tokenSlice.actions;
export default tokenSlice.reducer;
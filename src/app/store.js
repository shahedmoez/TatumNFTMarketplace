import { configureStore } from '@reduxjs/toolkit';
import NFTReducer from '../features/NFT/NFTSlice';

export const store = configureStore({
  reducer: {
    NFT:NFTReducer,
  },
});

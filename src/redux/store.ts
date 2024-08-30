import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import productReducer from './features/productSlice';
import invoiceReducer from './features/invoiceSlice';
import deliveryReducer from './features/deliverySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    invoice: invoiceReducer,
    delivery: deliveryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

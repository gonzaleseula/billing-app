// src/redux/features/deliverySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductInDelivery {
  productId: string;
  quantity: number;
}

interface Delivery {
  id: string;
  userId: string;
  products: ProductInDelivery[];
}

interface DeliveryState {
  deliveries: Delivery[];
}

const initialState: DeliveryState = {
  deliveries: [],
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setDeliveries: (state, action: PayloadAction<Delivery[]>) => {
      state.deliveries = action.payload;
    },
    addDelivery: (state, action: PayloadAction<Delivery>) => {
      state.deliveries.push(action.payload);
    },
  },
});

export const { setDeliveries, addDelivery } = deliverySlice.actions;
export default deliverySlice.reducer;

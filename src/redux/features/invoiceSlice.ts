import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Invoice {
  id: string;
  userId: string;
  deliveryIds: string[];
  status: 'pending' | 'paid';
  totalAmount: number;
}

interface InvoiceState {
  invoices: Invoice[];
}

const initialState: InvoiceState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload;
    },
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.push(action.payload);
    },
    updateInvoiceStatus: (state, action: PayloadAction<{ id: string; status: 'pending' | 'paid' }>) => {
      const index = state.invoices.findIndex(invoice => invoice.id === action.payload.id);
      if (index !== -1) {
        state.invoices[index].status = action.payload.status;
      }
    },
  },
});

export const { setInvoices, addInvoice, updateInvoiceStatus } = invoiceSlice.actions;
export default invoiceSlice.reducer;

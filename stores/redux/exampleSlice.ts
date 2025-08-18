import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
  count: number;
  text: string;
  isLoading: boolean;
}

const initialState: ExampleState = {
  count: 0,
  text: '',
  isLoading: false,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    reset: (state) => {
      state.count = 0;
      state.text = '';
      state.isLoading = false;
    },
  },
});

export const { increment, decrement, setCount, setText, setLoading, reset } = exampleSlice.actions;
export default exampleSlice.reducer;

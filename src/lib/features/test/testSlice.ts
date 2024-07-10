import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ITestSubject {
  name: string;
  age: number;
}

export interface ITestSliceState {
  items: ITestSubject[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ITestSliceState = {
  items: [],
  status: 'idle',
};

export const fetchTest = createAsyncThunk('test/fetchTest', async (params?: Record<string, string|number>) => {
  // I’m assuming the endpoint returns an array of objects matching the ITestSubject interface above
  const url = new URL('https://some-remote-api/test/items');
  const searchParams = new URLSearchParams();

  for (const key in params) {
    if (params[key]) {
      searchParams.append(key, params[key] as string);
    }
  }

  url.search = searchParams.toString();

  const response = await fetch(url.toString());
  return response.json();
});

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTest.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchTest.rejected, (state) => {
        state.status = 'failed';
      });
  },
  selectors: {
    selectItems: (state: ITestSliceState) => state.items,
    selectStatus: (state: ITestSliceState) => state.status,
  },
});

export const { selectItems, selectStatus } = testSlice.selectors;
import React from 'react';
import type { ApiResponseData } from '@/types/ApiResponseData';

const GlobalContext = React.createContext<{
  data: ApiResponseData | null;
  setData: (data: ApiResponseData | null) => void;
}>({
  data: null,
  setData: () => {},
});

export default GlobalContext;

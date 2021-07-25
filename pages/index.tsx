import IPLookup from '@/components/IPLookup';
import { Box, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { useState } from 'react';
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

type ApiResponseData = {
  ip: string;
  type: string;
  location: {
    latitude: number;
    longitude: number;
  };
  area: {
    name: string;
  };
  asn: {
    organisation: string;
  };
  city: {
    name: string;
  };
  country: {
    code: string;
    name: string;
    flag: {
      file: string;
    };
  };
  time: {
    timezone: string;
    time: string;
  };
};

type PageProps = {
  error: boolean;
  responseData: ApiResponseData | null;
};

export const GlobalContext = React.createContext<{
  data: ApiResponseData | null;
  setData: (data: ApiResponseData | null) => void;
}>({
  data: null,
  setData: () => {},
});

export const Home: React.FC<PageProps> = ({ error, responseData }) => {
  const [data, setData] = useState<ApiResponseData | null>(responseData);
  const errorMessage = 'Failed to retrieve information for your IP address. Please try again later.';

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      <main>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <Flex height="100vh" flexDirection="column">
          <IPLookup />
          <Map />
        </Flex>
      </main>
    </GlobalContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    const { req } = context;
    const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(', ')[0] || req.socket.remoteAddress || null;
    let error: boolean = false;
    let responseData: ApiResponseData | null = null;

    if (ipAddress) {
      const response = await axios.get(
        `https://api.getgeoapi.com/v2/ip/${ipAddress}?api_key=${process.env.IP_API_KEY}`
      );
      responseData = response.data as ApiResponseData;
    } else {
      error = true;
    }

    return { props: { error, responseData } };
  } catch (error) {
    console.error(error);
    return { props: { error: true, responseData: null } };
  }
};

export default Home;

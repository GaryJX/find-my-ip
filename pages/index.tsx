import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import IPLookup from '@/components/IPLookup';
import GlobalContext from '@/context/GlobalContext';
import type { ApiResponseData } from '@/types/ApiResponseData';
import CONFIG from '@/config/config';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

type PageProps = {
  responseData: ApiResponseData | null;
};

export const Home: React.FC<PageProps> = ({ responseData }) => {
  const [data, setData] = useState<ApiResponseData | null>(responseData);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      <main>
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
    let responseData: ApiResponseData | null = null;

    if (ipAddress) {
      const response = await axios.get(`https://api.getgeoapi.com/v2/ip/${ipAddress}?api_key=${CONFIG.ipApiKey}`);
      responseData = response.data as ApiResponseData;
    }

    return { props: { responseData } };
  } catch (error) {
    console.error(error);
    return { props: { responseData: null } };
  }
};

export default Home;

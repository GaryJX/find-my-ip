import axios from 'axios';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

type ApiResponseData = {
  ip: string;
  type: string;
  location: {
    latitude: number;
    longitutde: number;
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
  data: ApiResponseData | null;
  ipAddress: string | null;
};

export const Home: React.FC<PageProps> = ({ error, data, ipAddress }) => {
  const errorMessage = 'Failed to retrieve information for your IP address. Please try again later.';
  return (
    <main id="main" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* {error && <p>{errorMessage}</p>} */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <section>{ipAddress}</section> */}
      <div style={{ height: '30vh', width: '100%', background: 'blue' }}></div>
      <Map />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    const { req } = context;
    const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(', ')[0] || req.socket.remoteAddress || null;
    let error: boolean = false;
    let data: ApiResponseData | null = null;

    if (ipAddress) {
      const response = await axios.get(`https://api.getgeoapi.com/v2/ip/${ipAddress}?api_key=${process.env.IP_API_KEY}`);
      data = response.data as ApiResponseData;
    } else {
      error = true;
    }

    return { props: { error, data, ipAddress } };
  } catch (error) {
    console.error(error);
    return { props: { error: true, data: null, ipAddress: null } };
  }
};

export default Home;

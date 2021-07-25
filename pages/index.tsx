import axios from 'axios';
import { GetServerSideProps } from 'next';

type PageProps = {
  error: boolean;
  data: any | null;
  ipAddress: string | null;
};

export const Home: React.FC<PageProps> = ({ error, data, ipAddress }) => {
  const errorMessage = 'Failed to retrieve information for your IP address. Please try again later.';
  return (
    <main id="main">
      {error && <p>{errorMessage}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <section>{ipAddress}</section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    const { req } = context;
    const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(', ')[0] || req.socket.remoteAddress || null;
    let error: boolean = false;
    let data: any = null;

    if (ipAddress) {
      const response = await axios.get(`https://api.getgeoapi.com/v2/ip/${ipAddress}?api_key=${process.env.IP_API_KEY}`);
      data = response.data;

      console.log({ data: response.data });
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

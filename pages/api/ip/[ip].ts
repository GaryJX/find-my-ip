import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import CONFIG from '@/config/config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { ip } = req.query;

  if (ip) {
    await axios
      .get(`https://api.getgeoapi.com/v2/ip/${ip}?api_key=${CONFIG.ipApiKey}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.error({ error: error.response });
        const errorStatus = Number(error.status) || 500;
        res.status(errorStatus).json(error);
      });
  } else {
    res.status(400).json({
      message: 'Unable to retrieve request IP address.',
    });
  }
};

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { ip } = req.query;

  if (ip) {
    await axios
      .get(`https://api.getgeoapi.com/v2/ip/${ip}?api_key=${process.env.IP_API_KEY}`)
      .then((response) => {
        console.log({ data: response.data });
        console.log({ remoteAddress: req.socket.remoteAddress });
        console.log({ forwardedIp: req.headers });
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

import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await axios
    .get(
      `https://api.getgeoapi.com/v2/ip/check?api_key=${process.env.IP_API_KEY}`
    )
    .then((response) => {
      console.log({ data: response.data })
      console.log({ remoteAddress: req.socket.remoteAddress })
      res
        .status(200)
        .json({
          responseData: response.data,
          remoteAddress: req.socket.remoteAddress,
        })
    })
    .catch((error) => {
      console.error({ error: error.response })
      const errorStatus = Number(error.status) || 500
      res.status(errorStatus).json(error)
    })
}

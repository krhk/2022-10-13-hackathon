// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DataKHK } from "../../../utils/datakhk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await DataKHK.setPlaceDescription(parseInt(req.query.objectId), parseInt(req.query.datasetId), req.body);
  res.status(200).end(); 
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DataKHK} from '../../../utils/datakhk';
import {DataSet,DataSets} from '../../../utils/datatypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const placeReq = {
    nameSearch: req.query.name,
    district: req.query.district
  };
  if(typeof req.query.datasetId !== 'undefined'){
    placeReq.dataType = DataSets.find(x => x.id === parseInt(req.query.datasetId))
  }
  const data = await DataKHK.getPlaces(placeReq);
  res.status(200).json(data); 
}

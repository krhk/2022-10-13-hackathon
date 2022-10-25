// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import fs from "fs"

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageInfo = await prisma.place.findUnique({
    where: {
      datasetId_objectId: {
        objectId: parseInt(req.query.objectId),
        datasetId: parseInt(req.query.datasetId)
      } 
    },
    select: {
      imageName: true,
      imageType: true
    }
  });
  const stream = fs.createReadStream("./fetched/"+ (req.query.thumb?"thumb":"") + imageInfo.imageName);
  res.status(200);
  stream.pipe(res);
}

import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { DataSets,getPlaceReq, IDataSet } from './datatypes';
import GoogleAPI from "./googleApi"

const prisma = new PrismaClient();

export class DataKHK {
  static async getDatasetPlaces(dataset: IDataSet, req: getPlaceReq) : Promise<any>{
    let outFields = "nazev,x,y,OBJECTID,popis,telefon,www";
    let where = "1<2";
    if(req.nameSearch){
      where += " AND nazev LIKE '%" + req.nameSearch + "%'";
    }
    if(req.district){
      where += " AND kod_okresu='"+ req.district+"'";
    }
    const response = await axios.get(`https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/${dataset.dataName}/FeatureServer/0/query`, {
          params: {
            f: "json",
            where: where,
            outFields,
            resultRecordCount: 16
          }
        }
    );
    const res = response.data.features.map(
      (x:any) => {
        const attrs = x.attributes;
        attrs.objectId = parseInt(attrs["OBJECTID"]);
        attrs.datasetId = dataset.id;
        delete attrs["OBJECTID"];
        attrs.description = attrs["popis"];
        delete attrs["popis"];
        
        attrs.phone = attrs["telefon"];
        delete attrs["telefon"];
        
        attrs.website = attrs["www"];
        delete attrs["www"];
        return attrs;
      }
    );
    return res;
  }

  static async applyTrans(obj: any) : Promise<any>{
      var transObj = await prisma.place.findUnique({
        where: {
          datasetId_objectId: {objectId: obj.objectId, datasetId: obj.datasetId} 
        },
        select: {
          objectId: true, datasetId: true,
          rating: true,
          fetched: true,
          description: true,
        }
      });

      if(transObj === null){
        transObj = {
          objectId: obj.objectId,
          datasetId: obj.datasetId,
          description: obj.description||null,
          fetched: false
        }
      }
      if(!transObj.fetched){
        const placeInfo = await GoogleAPI.fetchPlaceInfo(obj.y, obj.x, obj.nazev);
        if(placeInfo !== null){
          if(placeInfo.image !== null){
            transObj.imageName = placeInfo.image.name;
            transObj.imageType = placeInfo.image.type;
          }
          transObj.rating = placeInfo.rating;
          transObj.fetched = true;
          await prisma.place.upsert({
            where: {
              datasetId_objectId: {objectId: transObj.objectId, datasetId: transObj.datasetId} 
            },
            update: {
              fetched: transObj.fetched,
              imageName: transObj.imageName,
              imageType: transObj.imageType,
              rating: transObj.rating
            },
            create: {
              objectId: transObj.objectId,
              datasetId: transObj.datasetId,
              fetched: transObj.fetched,
              imageName: transObj.imageName,
              imageType: transObj.imageType,
              rating: transObj.rating,
              description: transObj.description,
            }
          });
        }
      }

      obj.description = transObj.description;
      obj.rating = transObj.rating;
      return obj;
  }

  public static async getPlaces(req:getPlaceReq): Promise<object>{
    let targetDatasets = [];
    if(req.dataType){
      targetDatasets.push(req.dataType);
    } else {
      // aggregate all datasets if none specified
      targetDatasets = DataSets;
    }
    const t = await Promise.all(targetDatasets.map(x => DataKHK.getDatasetPlaces(x, req)));
    const res:any = [].concat(...t);
    const promises:any = [];
    res.forEach((obj:any) => {
      promises.push(DataKHK.applyTrans(obj))  
    });
    await Promise.all(promises);
    return res;
  }
  
  public static async getPlace(objectId: number, datasetId: number) : Promise<any>{
    const dataset = DataSets.find(x => x.id == datasetId);
    const response = await axios.get(`https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/${dataset.dataName}/FeatureServer/0/query`, {
          params: {
            f: "json",
            where: "OBJECTID="+objectId,
            outFields: "nazev,x,y,OBJECTID"
          }
        }
    );
    console.log(response);
    const attrs = response.data.features[0].attributes;
    attrs.objectId = parseInt(attrs["OBJECTID"]);
    attrs.datasetId = datasetId;
    delete attrs["OBJECTID"];
    return await this.applyTrans(attrs);

  }

  public static async setPlaceDescription(objectId: number, datasetId: number, description: string) : Promise<void>{
    await prisma.place.upsert({
      where: {
        datasetId_objectId: {objectId, datasetId} 
      },
      update: { description },
      create: { 
        objectId, datasetId, description, fetched: false 
      }
    });
  }
}

import axios from "axios"
import fs from "fs"

class PlaceResponse {
  rating: number|null = null;
  image: PlaceImage|null = null;
};

class PlaceImage {
  constructor(name: string, type: string){
    this.name = name;
    this.type = type;
  }
  name: string;
  type: string;
}
export default class GoogleAPI {
  public static async fetchPlaceInfo(lat: number, lon: number, name: string): Promise<PlaceResponse|null>{
    const resp = await axios.get(
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
      {
        params: {
          inputtype: "textquery",
          input: name,
          locationbias: `point:${lat},${lon}`,
          fields: "place_id,photo,rating",
          key: process.env.GOOGLE_API_KEY
        }
      }
    );
    if(resp.data.status !== "OK") {
      console.log("[GoogleAPI] fetch fail: " + resp.data.status);
      return null;
    }
    const place = resp.data.candidates[0];
    const result = new PlaceResponse();
    result.rating = typeof place.rating === 'undefined' ? null : place.rating; 
    result.website = typeof place.website === 'undefined' ? null : place.website; 
    result.phone = typeof place.international_phone_number === 'undefined' ? null : place.international_phone_number; 
    if(place.photos && place.photos.length > 0){
      const photo_ref = place.photos[0].photo_reference;
      result.image = await GoogleAPI.downloadPlacePhoto(photo_ref);
    }
    return result;
  }
  static async downloadPlacePhoto(photo_ref: string):Promise<PlaceImage> {
    const resp = await axios.get(
      "https://maps.googleapis.com/maps/api/place/photo",
      {
      params: {
        maxwidth: 1600,
        photo_reference: photo_ref,
        key: process.env.GOOGLE_API_KEY
      },
      responseType: "stream"
    });
    fs.promises.mkdir("./fetched", {recursive: true});
    resp.data.pipe(fs.createWriteStream("./fetched/"+photo_ref));
    const resp2 = await axios.get(
      "https://maps.googleapis.com/maps/api/place/photo",
      {
      params: {
        maxwidth: 300,
        photo_reference: photo_ref,
        key: process.env.GOOGLE_API_KEY
      },
      responseType: "stream"
    });
    resp2.data.pipe(fs.createWriteStream("./fetched/thumb"+photo_ref));
    return new PlaceImage(photo_ref, resp.headers['content-type']);
  }
}

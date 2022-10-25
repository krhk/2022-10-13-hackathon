export enum DataSet{ 
    Narodni_kult_pam = "Národní_kulturní_památky_na_indikativním_seznamu",
    Hrady = "Hrady",
} 
    
export interface IDataSet{
    id:number,
    dataName:String,
    shortName:String,
}
export const DataSets:IDataSet[] = [
    {id:1,dataName:"Přírodní_zajímavosti",shortName:"Přírodní zajímavosti"},
    {id:2,dataName:"Hrady",shortName:"Hrady"},
    {id:3,dataName:"Rozhledny_a_vyhlídky",shortName:"Rozhledny a vyhlídky"}
]

export enum Districts{
    HK = "CZ0521",
    JC = "CZ0522",
    NA = "CZ0523",
    RK = "CZ0524",
    TR = "CZ0525",
}

export interface getPlaceReq{
    nameSearch?:string | string[],
    dataType?: number,
    district?:string | string[],
}
export interface ITypeComp{
    typeName:string,
    imgPath:string,
    smallImgPath:string,
    setId:number,
}
export interface IPlaceQuery{
    objId?:string | string[],
    dataSetId?:string | string[],
}
export interface IPlace{
    datasetId?:number,
    datasetName:string,
    description?:string,
    nazev?:string,
    objectId?:number,
    rating?:string,
    x?:number,
    y?:number,

}

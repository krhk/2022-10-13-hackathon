import {useRouter} from 'next/router'
import {useState,useEffect} from 'react'
import {IPlaceQuery} from '../../utils/datatypes'
import Axios from 'axios'

export default function Place({obj,dataSetId}:IPlaceQuery){
   const axios = Axios
    useEffect(()=>{
        console.log(objId,dataSetId);
    },[])
   return(
        <div>
        </div>
   ) 

}

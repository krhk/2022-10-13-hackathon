import { Districts, getPlaceReq, DataSets } from '../../utils/datatypes'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import styles from "./searchStyle.module.scss"

export default function Search() {
    const [form, setForm] = useState<getPlaceReq>();
    const router = useRouter()

    const sendForm = ()=>{
        var p:string[] = [];
        if(form?.district)    
           p.push(encodeURIComponent("district")+"="+encodeURIComponent(form?.district.toString())) 
        if(form?.dataType)    
           p.push(encodeURIComponent("dataset")+"="+encodeURIComponent(form?.dataType.toString())) 
        if(form?.nameSearch)    
           p.push(encodeURIComponent("search")+"="+encodeURIComponent(form?.nameSearch.toString())) 

        //console.log(new URLSearchParams(s?.dataName.toString()).toString());
        router.push('/search?'+p.join("&"))
    }
    return (

        <div className={styles.search}>
            <div className={styles.inputWrapper}>
                <input type="text" placeholder="Zadejte název"
                    onChange={(e) => { setForm({ ...form, nameSearch: e.target.value }) }}
                />
            </div>


            <div className={styles.inputWrapper}>
                <div className={styles.dropdown} />
                 <select onChange={(e)=>{setForm({...form,district:e.target.value})}}>
                    <option value={undefined} hidden selected>Vyberte okres</option>
                    <option value={undefined} ></option>
                    <option value={Districts.JC}>Jíčín</option>
                    <option value={Districts.TR}>Trutnov</option>
                    <option value={Districts.NA}>Náchod</option>
                    <option value={Districts.RK}>Rychnov nad Kněžnou</option>
                </select>
            </div>

            <div className={styles.inputWrapper}>
                <div className={styles.dropdown} />
                <select value={form?.dataType} onChange={(e)=>{setForm({...form,dataType:Number(e.target.value)})}}>
                    <option value={undefined} hidden selected>Vyber kraj</option>
                    <option value={undefined} ></option>
                    {DataSets.map((item,index)=>{
                        return(
                            <option key={index} value={item.id}>{item.shortName}</option>
                        )
                    })

                    }
                </select>
            </div>


            <button onClick={sendForm}>Vyhledat</button>
        </div>
    )
}

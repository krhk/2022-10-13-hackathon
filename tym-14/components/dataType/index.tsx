import Link from 'next/link'
import {ITypeComp} from '../../utils/datatypes'
import styles from "./dataTypeStyle.module.scss"


export default function DataTypeComp({typeName,imgPath,smallImgPath,setId}:ITypeComp){
    return(
        <div className={styles.card}>
            <Link href={{pathname:"/search" ,query:{datatype:setId}}}>
                <h2>
                    {typeName}
                </h2>
            </Link>
            <div className={styles.background}  style={{backgroundImage: `url(${smallImgPath})`}}/>
        </div>
    )

}

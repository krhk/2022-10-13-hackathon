import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { DataSets, getPlaceReq, IPlace, Districts } from '../../utils/datatypes'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Head from 'next/head'
import styles from "styles/Search.module.scss"
import Link from 'next/link'

interface par {
    name?: string | string[],
    datasetId?: string | string[] | number,
    district?: string | string[],
}
export default function Search() {
    const router = useRouter()
    const [form, setForm] = useState<par | undefined>(undefined)
    const [data, setData] = useState<IPlace[] | undefined>(undefined)
    const { datatype, district, search } = router.query

    let param: par = {}
    useEffect(() => {
        param = {};
        setForm({ ...form, datasetId: datatype, district: district, name: search })
        searchHandler()
    }, [datatype])

    const searchHandler = async () => {
        var p: par = { datasetId: param.datasetId };
        const res = await axios.get('http://localhost:3000/api/place/search', {
            params: p
        })
        console.log(res.data);
        setData(res.data);

    }
    const formHandler = async () => {
        console.log(form);
        const res = await axios.get('http://localhost:3000/api/place/search', {
            params: form
        })
        console.log(res.data);
        setData(res.data);

    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;700;900&display=swap" rel="stylesheet" />
            </Head>
            <Header />
            <div className='topImage'>


                <h1>Vyhledávání</h1>
                <img src="/pictures/hrad.jpg" />

            </div>
            <div>
                <div>
                    <input type="text"
                        value={form?.name}
                        onChange={(e) => { setForm({ ...form, name: e.target.value }) }}
                    />
                    <select onChange={(e) => { setForm({ ...form, district: e.target.value }) }}>
                        <option value={undefined} hidden selected>Vyberte okres</option>
                        <option value={undefined} ></option>
                        <option value={Districts.HK}>Hradec</option>
                        <option value={Districts.JC}>Jíčín</option>
                        <option value={Districts.TR}>Trutnov</option>
                        <option value={Districts.NA}>Náchod</option>
                        <option value={Districts.RK}>Rychnov nad Kněžnou</option>
                    </select>
                    <select value={form?.datasetId} onChange={(e) => { setForm({ ...form, datasetId: Number(e.target.value) }) }}>
                        <option value={undefined} hidden selected>Vyber typ</option>
                        <option value={undefined} ></option>
                        {DataSets.map((item, index) => {
                            return (
                                <option key={index} value={item.id}>{item.shortName}</option>
                            )
                        })

                        }
                    </select>
                    <button onClick={formHandler}>Search</button>
                </div>
                <div>
                    {data &&
                        <div>
                            {
                                data.map((item: IPlace) => {
                                    return (

                                <Link href={`/place/${item.datasetId}/${item.objectId}`}>
                                    <div className={styles.placeCard}>
                                            <div className={styles.left}>
                                                <img src="/pictures/hrad_thumb.jpg" />
                                            </div>
                                            <div className={styles.right}>
                                                <h2>{item.nazev}</h2>
                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam id dolor. Quisque tincidunt scelerisque libero. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, eget facilisis enim ipsum id lacus. Duis pulvinar. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Vivamus porttitor turpis ac leo. Nullam dapibus fermentum ipsum.</p>
                                            </div>
                                        </div>
                                </Link>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
                <Footer />
            </div>
        </div>
    )

}

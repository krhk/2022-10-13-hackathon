import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import styles from '../styles/Home.module.scss'
import { useEffect, useState } from 'react'
import { Districts, ITypeComp } from '../utils/datatypes'
import Search from '../components/search'
import DataTypeComp from '../components/dataType'
import Footer from '../components/footer'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;700;900&display=swap" rel="stylesheet" />
      </Head>
      <Header />
      <div className={styles.landing}>
        <h1>Objevte krásy<br/>našeho kraje</h1>
        <Search />
        <img className={styles.landingImage} src="/src/landing.png"></img>
      </div>

      <h2 className={styles.h2}>Co navštívit</h2>
      <div className={styles.grid}>
        
      <DataTypeComp setId={1} typeName={'Přírodní zajímavosti'} imgPath={'/pictures/prirodni.jpg'} smallImgPath={'/pictures/prirodni_thumb.jpg'} />
      <DataTypeComp setId={1} typeName={'Hrady'} imgPath={'/pictures/hrad.jpg'} smallImgPath={'/pictures/hrad_thumb.jpg'} />
      <DataTypeComp setId={1}typeName={'Rozhledny a vyhlídky'} imgPath={'/pictures/rozhledny.jpg'} smallImgPath={'/pictures/rozhledny_thumb.jpg'} />
      <DataTypeComp setId={1} typeName={'Hrady'} imgPath={'/'} smallImgPath={'/'} /> <DataTypeComp setId={1} typeName={'Hrady'} imgPath={'/'} smallImgPath={'/'} />
      <DataTypeComp setId={1}typeName={'Hrady'} imgPath={'/'} smallImgPath={'/'} />
      <DataTypeComp setId={1}typeName={'Hrady'} imgPath={'/'} smallImgPath={'/'} />
      <DataTypeComp setId={1}typeName={'Hrady'} imgPath={'/'} smallImgPath={'/'} />
      <DataTypeComp setId={1}typeName={'Hrady'} imgPath={'/'} smallImgPath={'/'} />
      </div>
      <Footer/>
    </div>
  )
}
export default Home;

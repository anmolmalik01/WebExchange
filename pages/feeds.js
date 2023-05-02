import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'

import InfiniteScroll from "react-infinite-scroll-component";

import { MdOutlineComputer } from "react-icons/md"
import { BsTablet } from "react-icons/bs"
import { CiMobile1 } from "react-icons/ci"

import { useEffect, useState } from "react";

import db from '../util/db';
import Product from '../models/Product';
import ProductItem from '../components/ProductIem';
import { useSession } from 'next-auth/react';

export default function Feed({ products }) {

  const [device, setdevice] = useState("pc")

  return (
    <div>
      <Head>
        <title></title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      {/* navbar */}
      <Header />
      <div className="hidden md:block">
        <div className="flex flex-row justify-evenly pt-8 px-8 text-3xl">
          <CiMobile1
            onClick={() => { setdevice("mobile") }}
            className={`cursor-pointer hover:text-blue-400 ${(device == "mobile") ? 'text-blue-400' : ''} `}
          />
          <BsTablet
            onClick={() => { setdevice("tablet") }}
            className={`cursor-pointer hover:text-blue-400 ${(device == "tablet") ? 'text-blue-400' : ''} `}
          />
          <MdOutlineComputer onClick={() => { setdevice("pc") }}
            className={`cursor-pointer hover:text-blue-400 ${(device == "mobile") ? 'text-blue-400' : ''} `}
          />
        </div>

      </div>

      {/* middle content */}

      {device == 'mobile'
        ?
        (<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductItem
              product={product}
            ></ProductItem>
          ))}
        </div>)
        :
        (<></>)
      }
      {device == 'tablet'
        ?
        (<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {products.map((product) => (
            <ProductItem
              product={product}
            ></ProductItem>
          ))}
        </div>)
        :
        (<></>)
      }
      {device == 'pc'
        ?
        (<div className="grid grid-cols-1">
          {products.map((product) => (
            <ProductItem
              product={product}
            ></ProductItem>
          ))}
        </div>)
        :
        (<></>)
      }


    </div>
  )
}

export async function getServerSideProps(ctx) {
  await db.connect();
  const products = await Product.find();
  await db.disconnect();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
} 
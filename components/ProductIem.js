import Image from 'next/image'
import Link from 'next/link'

import Price from './Price'
import {BsArrowRightCircle, BsArrowRightCircleFill} from "react-icons/bs"

import { useSession } from 'next-auth/react';

export default function ProductItem({ product }) {

    const { data: session } = useSession();

    return (
        <div className=' py-10'>

            <div className="w-4/5 mx-auto border border-gray-400 dark:border-gray-600 transform hover:shadow-md">

                {/* webstie */}
                <div className="h-96 border-b-2 border-gray-100 dark:border-gray-600">
                    <Link
                        href={`${product.websiteLink}`}
                        // prefetch={false}
                    >
                        <iframe
                            src={product.websiteLink}
                            className="h-full w-full"
                        />
                    </Link>
                </div>

                {/* title */}
                <div className="bg-slate-100 dark:bg-black">
                    <div className="font-primary text-palette-primary text-2xl pt-2 px-4 font-semibold">
                        {product.websiteName}
                    </div>
                    {/* description */}
                    <div className="truncate text-lg text-gray-600 py-2 px-4 font-primary font-light">
                        {product.websiteDesc}
                    </div>
                    {/* price */}
                    <div
                    className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle"
                >
                   <BsArrowRightCircle 
                   onMouseEnter={ () => {(<BsArrowRightCircleFill /> )}} 
                   className="text-2xl"
                   />
                </div> 
                </div>
            </div>
        </div>
    )
}


import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import User from '../../models/User';
import db from '../../utils/db';


import { getSession, useSession } from "next-auth/react";
import { FaMedium } from "react-icons/fa"
import { VscGithub } from "react-icons/vsc"
import { GrMail } from "react-icons/gr"
import { SiTwitter } from "react-icons/si"

import Header from "../components/Header";


export default function profile(props) {
    const { user } = props;
    const router = useRouter();
    if (!user) {
        return <div title="Produt Not Found">Produt Not Found</div>;
    }

    return (
        <div>
            {/* header */}
            <Header />
            <section className="body-font relative m-12 bg-purple-200">
                {/* first part */}
                <div className="mx-auto">
                    <h1 className="mx-auto sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Profile</h1>
                </div>

                {/* form */}
                <form className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-col -m-2">

                        {/* profile pic */}
                        <div className="flex flex-col text-center w-full mb-12">
                            <MenuItem>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={user?.image}
                                    sx={{ width: 56, height: 56 }}
                                />
                            </MenuItem>
                        </div>

                        {/* profile name */}
                        <div className="p-2">
                            <div className="relative">
                                <label
                                    className="leading-7 text-sm">
                                    Name
                                </label>
                                <div>
                                    <input
                                        type="text"
                                        name="website_name"
                                        id="website_name"
                                        placeholder={user.name}
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                        </div>


                        {/* profile email */}
                        <div className="p-2">
                            <div className="relative">
                                <label
                                    className="leading-7 text-sm">
                                    Email
                                </label>
                                <div>
                                    <input
                                        type="email"
                                        name="website_name"
                                        id="website_name"
                                        placeholder={user.email}
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* profile social */}
                        <div className="p-2">
                            <div className="relative">
                                <label
                                    className="leading-7 text-sm">
                                    Social Media
                                </label>
                                <div className="flex flex-col items-center">
                                    <div className="my-3 flex space-x-4">
                                        <FaMedium className="text-3xl" />
                                        <VscGithub className="text-3xl" />
                                        <GrMail className="text-3xl" />
                                        <SiTwitter className="text-3xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section >
        </div>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    await db.connect();
    const user = await User.findOne({ email }).lean();
    await db.disconnect();
    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
        },
    };
}
import { getSession, useSession } from "next-auth/react";

import { useForm } from 'react-hook-form';

import Header from '../components/Header';

import axios from "axios";
import { useRouter } from 'next/router'

export default function Form() {

  const router = useRouter()

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
        reset
    } = useForm();

    const submitHandler = async ({ websiteName, websiteLink, websiteDesc, websiteType }, e) => {
        // ===================== post request ================
        try {
            await axios.post('/api/product', {
                websiteName,
                websiteLink,
                websiteDesc,
                websiteType
            });
            e.preventDefault()
            reset()

        } catch (err) {
            if (err) {
                throw err;
            }
        }
        router.push('/')
    };

    return (

        <section className="body-font relative ">

            {/* header */}
            <Header />
            {/* ========================= first part ========================= */}
            <div className="mx-auto">
                {/* heading */}
                <div className="w-full pl-56 py-8 ">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font">Upload your website</h1>
                </div>

                {/* ========================= form ========================= */}
                <form
                    className="lg:w-1/2 md:w-2/3 mx-auto"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <div className="flex flex-col -m-2">
                        {/* website name */}
                        <div className="p-2 ">
                            <label
                                htmlFor="websiteName"
                                className="leading-7 text-sm"
                            >
                                Website Name
                            </label>
                            <input
                                type="text"
                                id="website_name"
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                {...register('websiteName', {
                                    required: 'Please enter your Website name',
                                })}
                            />
                            {errors.websiteName && (
                                <div className="text-red-500">{errors.websiteName.message}
                                </div>
                            )}
                        </div>

                        {/* ========================= website link ========================= */}
                        <div className="p-2 ">
                            <label
                                htmlFor="websiteLink"
                                className="leading-7 text-sm"
                            >
                                Website Link
                            </label>
                            <input
                                type="url"
                                id="websiteLink"
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                {...register('websiteLink', {
                                    required: 'Please enter website Link',
                                })}
                            />
                            {errors.websiteLink && (
                                <div className="text-red-500">{errors.websiteLink.message}</div>
                            )}
                        </div>

                        {/* ========================= website type ========================= */}
                        <div className="p-2">
                            <div className="relative">
                                <label
                                    htmlFor="websiteType"
                                    className="leading-7 text-sm">
                                    Website Type
                                </label>
                                {/* ========================= dropdown ========================= */}
                                <div>
                                    <div>
                                        <select
                                            className={`w-full px-3 py-3 bg-white rounded border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out
                                            ${errors.websiteType &&
                                                " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                                            {...register("websiteType", { required: 'Website Type is required' })}
                                        >
                                            <option value=''>--Select websiteType--</option>
                                            <option value='male'>e commerce</option>
                                            <option value='female'>Female</option>
                                            <option value='other'>other</option>
                                        </select>
                                    </div>
                                    <div>
                                        {errors.websiteType && <span className='text-sm text-red-500'>{errors.websiteType.message}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ========================= website description ========================= */}
                        <div className="p-2 ">
                            <label
                                htmlFor="websiteDesc"
                                className="leading-7 text-sm"
                            >
                                Website description
                            </label>
                            <input
                                type="text"
                                id="websiteDesc"
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                {...register('websiteDesc', {
                                    required: 'Description should be atleast 12 words',
                                })}
                            />
                            {errors.websiteDesc && (
                                <div className="text-red-500">{errors.websiteDesc.message}</div>
                            )}
                        </div>

                        {/* ========================= button ========================= */}
                        <div className="p-10 w-full flex justify-center">
                            <button className="rounded bg-blue-400 py-2 px-4 shadow outline-none hover:bg-blue-300 active:bg-blue-400 transition-colors duration-200 ease-in-out">
                                submit
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </section >
    );
}


export async function getServerSideProps(context) {
    // Check if the user is authenticated on the server...
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/signin",
            },
        };
    }
    return {
        props: { session }
    }
}
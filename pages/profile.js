import { getSession, useSession } from "next-auth/react";
import { FaMedium } from "react-icons/fa"
import { VscGithub } from "react-icons/vsc"
import { GrMail } from "react-icons/gr"
import { SiTwitter } from "react-icons/si"
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { MenuItem, Avatar } from '@mui/material';
import { icons } from "react-icons";
import Header from "../components/Header";

import { useRouter } from 'next/router'

import db from '../util/db';
import UserDetails from '../models/UserDetails';

export default function profile({ userdetails }) {
  console.log(userdetails)

  const { data: session } = useSession();
  
  const router = useRouter();


  useEffect(() => {
    if (session?.user) {
      router.push('/');
    }
  }, []);


  return (
    <div>

      <Header />
      <section className="body-font relative m-12 bg-purple-200">
        {/* header */}
        {/* first part */}
        <div className="mx-auto">
          <h1 className="mx-auto sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Profile</h1>
        </div>

        {/* form */}
        <div>
          <div className="flex flex-col -m-2">

            {/* profile pic */}
            <div className="flex flex-col text-center w-full mb-12">
              <MenuItem>
                <Avatar
                  alt="Remy Sharp"
                  src={session?.user?.image}
                  sx={{ width: 56, height: 56 }}
                />
              </MenuItem>
            </div>

            {/* profile name */}
            <div className="mb-4">
              <p>Name</p>
              <p>{session?.user?.name}</p>
            </div>


            {/* ================ profile email ================ */}
            <div className="mb-4">
              <p>Email</p>
              <p>{session?.user?.email}</p>
            </div>

            {/* ================ user description ================ */}
            <div className="mb-4">
              <p>User Desc</p>
              {/* <p>{userDetails.userId}</p> */}
            </div>


            {/* ================ social media ================ */}

            {/* profile social */}
            <div className="p-2">
              <div className="relative">
                <label
                  className="leading-7 text-sm">
                  Social Media
                </label>
                <div className="flex flex-col items-center">
                  <div className="my-3 flex space-x-4">
                    <input
                      type="text"
                      // placeholder={userDetails.github}
                      disabled="disabled"
                    />
                    <FaMedium className="text-3xl" />
                    <VscGithub className="text-3xl" />
                    <GrMail className="text-3xl" />
                    <SiTwitter className="text-3xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};


export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  await db.connect();
  const userdetails = await UserDetails.findOne({ userId: session.user.email });
  console.log(userdetails)
  await db.disconnect();
  return {
    props: {
      userdetails: JSON.parse(JSON.stringify(userdetails)),
    },
  };
}
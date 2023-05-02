import Link from 'next/link'

import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { FiSun } from 'react-icons/fi';
import { BiMoon } from 'react-icons/bi';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { GiCobweb } from 'react-icons/gi'
import { BsSunFill, BsMoonFill } from "react-icons/bs"

import AccountMenu from './AccountMenu'
import Button from '@mui/material/Button';

import { RxCross2 } from "react-icons/rx"
import { MdOutlineSegment } from "react-icons/md"
export default function Header() {

    const [navbar, setNavbar] = useState(false);

    const { data: session } = useSession()

    // dark mode
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <div>
            <nav className="w-full bg-blue-400 shadow">
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <a href="">
                                <h2 className="text-2xl font-bold">WebEstate</h2>
                            </a>
                            <div className="md:hidden">
                                {navbar
                                    ?
                                    (<RxCross2 onClick={() => setNavbar(!navbar)} />)
                                    :
                                    (<div className='flex flex-row'>
                                        {/* AccountMenu */}
                                        {session?.user
                                            ?
                                            (<div><AccountMenu /></div>)
                                            :
                                            (<></>)
                                        }
                                        {/* dark mode */}
                                        <div className="my-auto mx-2">
                                            {currentTheme === 'dark'
                                                ?
                                                (<BsSunFill onClick={() => setTheme('light')} />)
                                                :
                                                (<BsMoonFill onClick={() => setTheme('dark')} />)
                                            }
                                        </div>
                                        {/* mobile navbar */}
                                        <div className="my-auto">
                                            <MdOutlineSegment onClick={() => setNavbar(!navbar)} />
                                        </div>
                                    </div>
                                    )}
                            </div>
                        </div>
                    </div>
                    {/* middle part */}
                    <div>
                        <div
                            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                                }`}
                        >
                            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                                <li className=" hover:text-indigo-200">
                                    <Link href="/feeds">
                                        Websites
                                    </Link>
                                </li>
                                <li className='md:hidden'>
                                    {session?.user
                                        ?
                                        (<></>)
                                        :
                                        (<button onClick={() => signIn() }>Sigin</button>)
                                    }</li>
                            </ul>


                        </div>
                    </div>

                    {/* account menu && dark mode && upload */}
                    <div className="hidden space-x-2 md:inline-block">
                        <div className='flex flex-row'>
                            {/* upload botton */}
                            <div className="my-auto mx-2">
                                <Link href="/form">
                                    Upload
                                </Link>
                            </div>

                            {/* account menu */}
                            {session?.user
                                ?
                                (<div className="my-auto mx-2"> <AccountMenu /> </div>)
                                :
                                (<button onClick={() => signIn() }>Sigin</button>)
                            }


                            {/* dark mode */}
                            <div className="my-auto mx-2">
                                {currentTheme === 'dark'
                                    ?
                                    (<BsSunFill onClick={() => setTheme('light')} />)
                                    :
                                    (<BsMoonFill onClick={() => setTheme('dark')} />)
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </nav>


        </div>
    );
}
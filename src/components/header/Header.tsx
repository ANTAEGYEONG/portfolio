"use client"

import React, {useState, useEffect} from "react";
import Link from "next/Link"
import {
    Navbar,
    Collapse,
    Typography,
    IconButton
} from "@material-tailwind/react"
import "@/app/globals.css"

import MenuComp from "@/components/MenuComp";
import useSWR from "swr";

function NavHeader() {

    const [mounted, setMounted] = useState(false)

    let fetcher = async (url : String) => await fetch(url).then(res => res.json()).then(result => result)
    let {data, error} = useSWR(mounted ? "http://localhost:9999/menulist" : null, fetcher)

    useEffect(()=>{
        console.log("mounted!")
        setMounted(true)
    },[])

    //console.log(data)

    return(
        <ul className="tablet:my-2 flex flex-col navbar-nav justify-center space-x-0 tablet:mb-0 tablet:space-x-20 tablet:mt-0 tablet:flex-row tablet:gap-4">
            {
                data == undefined || data == null ? <></> :
                    data.map((item)=>{
                    return(
                        <MenuComp key={item.id} menu={item}></MenuComp>
                    )
                })
            }
        </ul>
    );
}

export default function Header() {
    const [openNav, setOpenNav] = useState(false)

    const handleWindowResize = () =>{
        console.log(window.innerWidth)
        window.innerWidth >= 912 && setOpenNav(false)
    }

    useEffect(()=>{
        window.addEventListener("resize", handleWindowResize)

        return () => {
            window.removeEventListener("resize", handleWindowResize)
        }
    }, [])

    return (
        <Navbar className="mx-auto my-auto tablet:pt-3 bg-white sticky top-0 z-50">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="div"
                    variant="h6"
                    className="mr-4 ml-4 tablet:ml-0 tablet:px-6 tablet:pb-3 text-black cursor-pointer py-1.5"
                >
                    <Link href="/">
                        Next Tailwind
                    </Link>

                </Typography>
                <IconButton
                    variant="text"
                    className="ml-auto mr-4 tablet:mr-0 h-6 w-6 text-black hover:bg-white focus:bg-white active:bg-white tablet:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    )}
                </IconButton>
                <div className={"flex flex-row tablet:px-6 tablet:pb-3"}>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-black hover:bg-white focus:bg-white active:bg-white hidden tablet:block"
                        ripple={false}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </IconButton>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-black hover:bg-white focus:bg-white active:bg-white hidden tablet:block"
                        ripple={false}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </IconButton>
                </div>
            </div>
            <div className="hidden tablet:block">
                <NavHeader />
            </div>
            <Collapse open={openNav} className={"absolute"}>
                <NavHeader />
            </Collapse>
        </Navbar>
    )
}

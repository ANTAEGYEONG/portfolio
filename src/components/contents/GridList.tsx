"use client"

import GridBox from "@/components/GridBox";
import useSWR from "swr";
import {useEffect} from "react";


export default function GridList(){
    const {data, error} = useSWR("http://localhost:9999/productlist")

    return (
        <div role={"list"} className={"w-full flex item-start grid grid-cols-2 tablet:grid-cols-3 lg:grid-cols-4 px-5 tablet:px-15 lg:px-30 gap-5 mt-16 mb-32"}>

            {
                data == undefined || data == null ? <></> :
                    (
                        data.map((content : Object) => {
                            return(
                                <GridBox key={content.id} content={content}></GridBox>
                            )
                        })
                    )
            }


        </div>
    )
}

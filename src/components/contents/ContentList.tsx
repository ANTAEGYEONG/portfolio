"use client"

import ContentBox from "@/components/ContentBox";
import useSWR from "swr";
import {useEffect} from "react";


export default function ContentList(){
    const {data, error} = useSWR("http://localhost:9999/productlist")

    return (
        <div role={"list"} className={"w-full flex item-start grid grid-cols-1 tablet:grid-cols-2 px-5 tablet:px-15 lg:px-30 gap-5 mt-16 mb-32"}>

            {
                data == undefined || data == null ? <></> :
                    (
                        data.map((content : Object) => {
                            return(
                                <ContentBox key={content.id} content={content}></ContentBox>
                            )
                        })
                    )
            }
        </div>
    )
}

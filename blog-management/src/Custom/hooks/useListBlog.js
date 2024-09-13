import {useEffect, useState} from "react";
import axios from "axios";

export default function useListBlog(urlBlog, interval = 5000) {
    const [listBlog, setListBlog] = useState([]);
    
    useEffect(() => {
        setInterval(()=>{
            axios.get(urlBlog).then((res) => {
                setListBlog(res.data)
            })
        }, interval)
    }, [urlBlog]);
    
    return {listBlog}
}
import { useEffect, useState } from "react";
import axios from "axios";

export default function useListBlog(urlBlog, interval = 5000) {
    const [listBlog, setListBlog] = useState([]);
    
    const getData = () => {
        axios.get(urlBlog).then((res) => {
            setListBlog(res.data);
        }).catch((error) => {
            console.error(error);
        });
    };
    
    useEffect(() => {
        getData();
        
        const fetchInterval = setInterval(() => {
            getData();
        }, interval);
        
        return () => clearInterval(fetchInterval);
    }, [urlBlog, interval]);
    
    return { listBlog, getData };
}

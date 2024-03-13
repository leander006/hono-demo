import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "username": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
      const getData =async() =>{
            try {
                 const {data} = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                        headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage?.getItem("token")}`,
                            },
                    })
                    setBlog(data)

                    setLoading(false)
            } catch (error) {
                  console.log(error);
                  
            }
      }
      getData()
    }, [id])

    return {
        loading,
        blog
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
      const getData =async() =>{
            try {
                 const {data} = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                        headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage?.getItem("token")}`,
                            },
                    })                    
                    setBlogs(data)
                    setLoading(false)
            } catch (error) {
                  console.log(error);  
            }
      }
      getData()
    }, [])


    return {
        loading,
        blogs,
    }
}
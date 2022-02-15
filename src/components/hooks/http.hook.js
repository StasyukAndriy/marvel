import { useState, useCallback } from "react";
export const useHttp = ()=>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const request = useCallback(async (url,method = 'GET', body = null, headers = {'Content-Type': 'application/json'})=>{

        setLoading(true)
         try{
            let res  = await fetch(url, {method, body, headers})
            res = await res.json()
            setLoading(false)
            return res;
         }catch(e){
             setError(true)
             setLoading(false)
            //  throw e;
         }
         
       
    }, [])
    const clearError = useCallback(()=>{
        setError(false)
    }, [])
    return {loading, error, clearError, request}
}


import { useState } from "react"

export const useFetching = (calBack) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const fetching = async (parm) => {
        try{
            setIsLoading(true);
            await calBack(parm);           
        } catch (e){
            setError(e.message);
        } finally{
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error]
}
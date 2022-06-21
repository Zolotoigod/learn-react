import { useState } from "react"

export const useFetching = (calBack) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const fetching = async () => {
        try{
            setIsLoading(true);
            await calBack();           
        } catch (e){
            setError(e.message);
        } finally{
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error]
}
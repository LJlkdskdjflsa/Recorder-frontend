import axiosInstance from "../../services/axios";

export const fetchItems = async (url: string, setLoading: Function = () => {
}): Promise<any> => {
    setLoading(true)
    return await axiosInstance.get(url)
        .then((response) => {
            // @ts-ignore
            setTemplates(response.data)
        }).catch((error) => {
            console.error(error)
        }).finally(() => {
            setLoading(false)
        })
}


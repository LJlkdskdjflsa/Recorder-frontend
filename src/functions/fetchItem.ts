import axiosInstance from "../services/axios";

export function fetchItem<T>(setLoading: Function, url: string): any {
    setLoading(true);
    axiosInstance
        .get(url)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setLoading(false);
        });
}
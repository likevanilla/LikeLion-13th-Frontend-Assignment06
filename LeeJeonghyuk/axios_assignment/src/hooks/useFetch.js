import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, {
                    method: "GET",
                });
                if (response.ok) {
                    setData(await response.json());
                } else {
                    throw new Error("데이터를 불러오는 데 실패했습니다.");
                }
            } catch (e) {
                setError(true);
                setErrorMessage(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return {
        loading,
        data,
        error,
        errorMessage,
    };
};
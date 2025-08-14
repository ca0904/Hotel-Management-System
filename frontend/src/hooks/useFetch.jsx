import { useState, useEffect } from 'react';

const useFetch = () => {
    const [url, setUrl] = useState(null);
    const [options, setOptions] = useState({});
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const setFetchOptions = (fetchOptions) => {
        setUrl(fetchOptions.url);
        setOptions(fetchOptions);
    };

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setData(null);

            try {
                const response = await fetch(url, {
                    method: options.method || 'GET',
                    headers: options.headers || {},
                    body: options.body ? JSON.stringify(options.body) : null,
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const result = options.respf === 'text'
                    ? await response.text()
                    : await response.json();

                setData(result);

                // ✅ Important: Call onSuccess if it exists
                if (typeof options.onSuccess === 'function') {
                    options.onSuccess(result);
                }

            } catch (err) {
                setError('Unable to perform the request: ');
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, loading, error, setFetchOptions };
};

export default useFetch;

interface IRequestConfig {
    url: string;
    method?: string;
    body?: null | string;
    headers?: {};
}

const useHttp = () => {
    const sendRequest = async (
        config: IRequestConfig,
        apply: (a: object) => void
    ) => {
        const response = await fetch(config.url, {
            method: config.method ? config.method : "GET",
            headers: config.headers ? config.headers : {},
            body: config.body ? config.body : null,
        });
        const data = await response.json();
        apply(data);
    };

    return {
        sendRequest,
    };
};

export default useHttp;

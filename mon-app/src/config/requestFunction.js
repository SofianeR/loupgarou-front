export const requestManager = async (url_server, method, data) => {
    return await fetch(url_server, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data ? data : {}),
    }).then(async (response) => {
        if (response.ok) {
           return await response.json()
        }
    })
};

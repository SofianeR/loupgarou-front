export const requestManager = async (url_server, method, data) => {
  const fetchData = await fetch(url_server, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data ? data : {}),
  });

  return await fetchData.json();
};

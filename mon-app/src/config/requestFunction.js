export const requestManager = async (url_server, method, data) => {
  await fetch(url_server, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data ? data : {}),
  })
    .then(async (data) => {
      if (data) {
        return await data.json();
      }
    })
    .catch((error) => {
      console.log("je suis log de catch request manager => ", error.message);
      return error.message;
    });
};

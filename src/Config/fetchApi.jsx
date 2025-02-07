function fetchApi(url, method, body) {
  return fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined, // case GET method not have body
  });
}

export default fetchApi;

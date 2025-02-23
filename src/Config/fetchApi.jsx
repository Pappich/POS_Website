function fetchApi(url, method, body) {
  // Retrieve the values from sessionStorage
  const token = sessionStorage.getItem("token");
  const ownerId = sessionStorage.getItem("owner_id");
  // const branchId = sessionStorage.getItem("branch_id");

  // manual branch = 1 for now
  const branchId = sessionStorage.getItem("branch_id");
  const role = sessionStorage.getItem("roles");
  const email = sessionStorage.getItem("email");
  
  // set data in header
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // Add the Authorization and other custom headers
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (ownerId) {
    headers["owner_id"] = parseInt(ownerId);
  }
  if (branchId) {
    headers["branch_id"] = parseInt(branchId);
  }
  if (role) {
    headers["role"] = role;
  }

  console.log("HEADERS :", headers);

  return fetch(url, {
    method,
    headers: headers,
    body: body ? JSON.stringify(body) : undefined,
  });
}

export default fetchApi;

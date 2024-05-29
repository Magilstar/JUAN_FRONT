const FetchManager = async ({
  url,
  method = "GET",
  body,
  isCors = false,
  token,
}) => {
  try {
    const config = {
      method,
      credentials: "include",
      mode: isCors ? "cors" : "no-cors",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
      },
    };

    if (body && (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE")) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      `Ocurrió un error realizando un fetch, donde la url era ${url} y el error fue ${error.message}`
    );

    console.error(error)
    return false;
  }
};

export default FetchManager;

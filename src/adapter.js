const URI = "http://localhost:3001/api/v1/";

const adapter = {
  get: function(items) {
    return fetch(URI + items);
  },
  post: function(items, body) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };

    return fetch(URI + items, config);
  },
  patch: function(item, body) {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };

    return fetch(URI + item, config);
  },
  delete: function(item) {
    const config = {
      method: "DELETE",
    };

    return fetch(URI + item, config);
  }
}

export default adapter;

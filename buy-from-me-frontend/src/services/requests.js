const URL_FETCH = 'http://localhost:3001/';
const APLICATION = 'application/json';

async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${URL_FETCH}user/login`, {
      method: 'POST',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function getUser(id, token) {
  try {
    const response = await fetch(`${URL_FETCH}user/${id}`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function createUser(userData) {
  try {
    const response = await fetch(`${URL_FETCH}user/`, {
      method: 'POST',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
      },
      body: JSON.stringify(userData),
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function getProductById(id) {
  try {
    const response = await fetch(`${URL_FETCH}product/${id}`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function getProducts(page) {
  try {
    const response = await fetch(`${URL_FETCH}product?pag=${page}`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function getProductsByFilter(pag, {
  name, category, newP, sold, price, filter,
}) {
  try {
    const response = await fetch(`${URL_FETCH}product/filter?pag=${pag}&filter=${filter}&price=${price}&sold=${sold}&newP=${newP}&category=${category}&name=${name}`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function getOrders(token, filter) {
  try {
    const response = await fetch(`${URL_FETCH}order?filter=${filter}`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function getOrder(token, id) {
  try {
    const response = await fetch(`${URL_FETCH}order/${id}`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function createOrder(token, id) {
  try {
    const response = await fetch(`${URL_FETCH}order`, {
      method: 'POST',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
      body: JSON.stringify({
        productsId: id,
      }),
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function deleteOrder(token, id) {
  try {
    const response = await fetch(`${URL_FETCH}order/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

export default {
  loginUser,
  getUser,
  createUser,
  getProductById,
  getProducts,
  getProductsByFilter,
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
};

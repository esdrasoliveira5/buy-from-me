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

export default {
  loginUser,
  getUser,
  createUser,
};

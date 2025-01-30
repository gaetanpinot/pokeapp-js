const BASE_URL = "https://pokeapi.co/api/v2/";
const request = async (
  endpoint,
  method = "GET",
  baseUrl = true,
  body = null,
  isAuthRequest = false,
) => {
  // Définir les en-têtes
  const headers = {
    "Content-Type": "application/json",
  };
  // Configurer la requête
  const config = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };
  try {
    // Envoyer la requête
    const url = baseUrl ? `${BASE_URL}${endpoint}` : endpoint;
    const response = await fetch(url, config);
    if (response.status === 403 || response.status === 401) {
      // Token expired or invalid, remove token and redirect to login
      window.location.href = "/login";
      return;
    }
    // Gérer la réponse
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || "Something went wrong");
    }
    // Vérifier si la réponse a du contenu
    const contentType = response.headers.get("content-type");
    return contentType && contentType.includes("application/json")
      ? await response.json()
      : null;
  } catch (error) {
    // Gestion des erreurs
    console.error("API Error:", error);
    throw error;
  }
};
const getPokemons = (page) => {
  return request("/pokemon?limit=5&offset=" + page, "GET", true);
};
const getAllPokemons = () => {
  return request("/pokemon?limit=100000&offset=0", "GET", true);
};
const getPokemon = (name) => {
  return request("/pokemon/" + name, "GET", true);
};
const getTypes = () => {
  return request("/type?limit=50", "GET", true);
};
const getType = (type) => {
  return request("/type/" + type, "GET", true);
};
const fetchUrl = (url) => {
  return request(url, "GET", false);
};
export { getPokemons, fetchUrl, getPokemon, getAllPokemons, getTypes, getType };

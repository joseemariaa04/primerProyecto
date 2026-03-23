export default async function getPeliculas() {
  try {
    const response = await fetch(`https://devsapihub.com/api-movies`);

    const data = await response.json();

    return data; // array de películas
  } catch (error) {
    console.error("Error al obtener películas:", error);
    return [];
  }
}

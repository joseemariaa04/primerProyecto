export const getCoordenadas = async (ciudad: string) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}`,
  ); //Obtener coordenadas

  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Ciudad no encontrada");
  }

  return data.results[0];
};

export const getClima = async (lat: number, long: number) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`,
  );

  return res.json();
};

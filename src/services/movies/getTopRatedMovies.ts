import api from "../api";

export const getTopRatedMovies = async () => {
  const endpoint = "/movie/top_rated?language=en-US";
  try {
    const { data } = await api.get(endpoint);
    return data;
  } catch (error: any) {
    throw error;
  }
};

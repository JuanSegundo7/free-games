import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_RAPID_API_KEY;

const get_games_by_params = async (type: string, id: string) => {
  const options = {
    method: "GET",
    url: `https://free-to-play-games-database.p.rapidapi.com/api/games?${type}=${id}`,
    headers: {
      "X-RapidAPI-Key": baseUrl,
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default get_games_by_params;

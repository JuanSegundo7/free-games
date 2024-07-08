import axios from "axios";

const get_game_by_id = async (id: string) => {
  const options = {
    method: "GET",
    url: `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
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

export default get_game_by_id;

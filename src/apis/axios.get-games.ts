import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const options = {
  method: "GET",
  url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};

const get_games = async () => {
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default get_games;
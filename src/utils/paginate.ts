import { IGame } from "@/interfaces/games";

// utils/pagination.js
export const paginate = (
  array: IGame[],
  pageSize: number,
  pageNumber: number
) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

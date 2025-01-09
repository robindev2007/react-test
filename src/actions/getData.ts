"use server";

import { DataRes } from "@/types/data";
import axios from "axios";

export const getFilletedData = async ({
  searchQuery,
  page = 1,
}: {
  searchQuery: string;
  page?: number;
}) => {
  const { data } = await axios.get<DataRes>(
    `https://api.razzakfashion.com/?search=${searchQuery}&page=${page}`,
  );

  return data;
};

export const getTableData = async ({
  searchQuery = "",
  page = 1,
}: {
  searchQuery?: string;
  page?: number;
}) => {
  const url = searchQuery
    ? `https://api.razzakfashion.com/?search=${searchQuery}&page=${page}`
    : `https://api.razzakfashion.com/?page=${page}`;

  const { data } = await axios.get<DataRes>(url);

  return data;
};

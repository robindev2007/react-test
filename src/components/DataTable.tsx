"use client";
import { getTableData } from "@/actions/getData";
import { Data, DataRes } from "@/types/data";
import { formattedDate } from "@/utils/formatDate";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { PiArrowLineRightBold, PiArrowLineLeftBold } from "react-icons/pi";

function DataTable({ initialData }: { initialData: DataRes }) {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryDebounce] = useDebounce(searchQuery, 400);
  const [loading, setLoading] = useState(true);

  console.log(data);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const resData = await getTableData({
        searchQuery,
        page: 1,
      });

      setData(resData);

      setLoading(false);
    };

    getData();
  }, [searchQueryDebounce]);

  const fetchNextPage = async () => {
    setLoading(true);
    const resData = await getTableData({
      page: data.current_page + 1,
      searchQuery,
    });

    console.log(data.current_page + 1);

    setData(resData);
    console.log(resData);
    setLoading(false);
  };
  const fetchPrevPage = async () => {
    setLoading(true);

    const resData = await getTableData({
      page: data.current_page - 1,
      searchQuery,
    });

    setData(resData);
    setLoading(false);
  };

  const fetchFirstPage = async () => {
    setLoading(true);

    const resData = await getTableData({
      page: 1,
      searchQuery,
    });

    setData(resData);
    setLoading(false);
  };

  const fetchLastPage = async () => {
    setLoading(true);

    const resData = await getTableData({
      page: data.last_page,
      searchQuery,
    });

    setData(resData);
    setLoading(false);
  };

  return (
    <div className="rounded-md border border-[#2F2F34] text-[#B6B6BB]">
      <div className="p-3">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-[#2F2F34] p-2 py-1 transition-colors ease-out focus-within:border-red-400 focus-within:outline-none md:w-auto"
          placeholder="Search"
        />
      </div>
      <div className="overflow-auto">
        <table className="w-full bg-[#19191E]">
          <thead className="border-b border-[#2F2F34]">
            <tr>
              <th className="w-20 whitespace-nowrap p-3 text-left text-sm font-semibold tracking-wide">
                ID
              </th>
              <th className="whitespace-nowrap p-3 text-left text-sm font-semibold tracking-wide">
                Name
              </th>
              <th className="whitespace-nowrap p-3 text-left text-sm font-semibold tracking-wide">
                Email
              </th>
              <th className="whitespace-nowrap p-3 text-left text-sm font-semibold tracking-wide">
                Email Verified At
              </th>
              <th className="whitespace-nowrap p-3 text-left text-sm font-semibold tracking-wide">
                Created At
              </th>
              <th className="w-56 whitespace-nowrap p-3 text-left text-sm font-semibold tracking-wide">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <TableLoading />
            ) : data.data.length > 0 ? (
              data.data.map((data) => <SingleData key={data.id} data={data} />)
            ) : (
              <tr>
                <td colSpan={5} className="p-3">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end gap-3 p-3 py-2">
        <p className="text-sm">
          {data.current_page * data.per_page - 10}-
          {data.current_page * data.per_page > data.total
            ? data.total
            : data.current_page * data.per_page}{" "}
          of {data.total}
        </p>
        <div className="flex gap-0">
          <div className="flex gap-2">
            <button
              title="First Page"
              onClick={fetchFirstPage}
              disabled={data.current_page == 1 || loading}
              className="rounded-md px-2 py-1 hover:bg-gray-800 disabled:opacity-50"
            >
              <PiArrowLineLeftBold />
            </button>
            <button
              title="Previous Page"
              onClick={fetchPrevPage}
              disabled={!data.prev_page_url || loading}
              className="rounded-md px-2 py-1 hover:bg-gray-800 disabled:opacity-50"
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              title="Next Page"
              disabled={!data.next_page_url || loading}
              onClick={fetchNextPage}
              className="rounded-md px-2 py-1 hover:bg-gray-800 disabled:opacity-50"
            >
              <FaArrowRight />
            </button>
            <button
              title="Last Page"
              disabled={data.current_page == data.last_page || loading}
              onClick={fetchLastPage}
              className="rounded-md px-2 py-1 hover:bg-gray-800 disabled:opacity-50"
            >
              <PiArrowLineRightBold />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;

const SingleData = ({ data }: { data: Data }) => {
  return (
    <tr className="bg-[#1E1E23]">
      <td className="whitespace-nowrap border-b border-[#2F2F34] p-3 text-sm">
        {data.id}
      </td>
      <td className="whitespace-nowrap border-b border-[#2F2F34] p-3 text-sm">
        {data.name}
      </td>
      <td className="whitespace-nowrap border-b border-[#2F2F34] p-3 text-sm">
        {data.email}
      </td>
      <td className="whitespace-nowrap border-b border-[#2F2F34] p-3 text-sm">
        {formattedDate(data.email_verified_at)}
      </td>
      <td className="whitespace-nowrap border-b border-[#2F2F34] p-3 text-sm">
        {formattedDate(data.created_at)}
      </td>
      <td className="whitespace-nowrap border-b border-[#2F2F34] p-3 text-sm">
        {formattedDate(data.updated_at)}
      </td>
    </tr>
  );
};

const TableLoading = () => {
  return Array.from({ length: 10 }).map((_, i) => (
    <tr className="bg-[#1E1E23]" key={i}>
      {Array.from({ length: 6 }).map((_, i) => (
        <td
          key={i}
          className="w-52 whitespace-nowrap border-b border-[#2F2F34] p-3 text-sm"
        >
          <div className="h-5 w-full animate-pulse rounded-md bg-gray-600"></div>
        </td>
      ))}
    </tr>
  ));
};

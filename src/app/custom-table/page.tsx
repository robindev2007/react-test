import DataTable from "@/components/DataTable";
import { DataRes } from "@/types/data";
import axios from "axios";
import React from "react";

async function CustomTablePage() {
  const { data } = await axios.get<DataRes>("https://api.razzakfashion.com/");

  console.log(data);

  return (
    <div className="h-full min-h-screen space-y-5 bg-[#0F0F0F] p-3 text-[#B6B6BB]">
      <div className="mx-auto max-w-screen-xl space-y-5">
        <div>
          <h1 className="text-center text-lg">Custom table example</h1>

          <div className="p-3">
            <ul className="list-disc">
              <li className="text-sm font-medium">
                Used debounce fo performance
              </li>
              <li className="text-sm font-medium">Tailwind CSS for styling</li>
              <li className="text-sm font-medium">
                Next.js Server Action for api calling (Calling api from client
                show <span className="text-red-400">CORS ERROR</span> and the
                extension also doesn&apos;t work )
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-center text-xl font-medium">Table</h2>
          <DataTable initialData={data} />
        </div>
      </div>
    </div>
  );
}

export default CustomTablePage;

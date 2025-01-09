import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col space-y-5">
        <Link
          href="/custom-tshirt-desing"
          className="text-xl font-medium hover:text-sky-500"
        >
          T-shirt
        </Link>
        <Link
          href="/custom-table"
          className="text-xl font-medium hover:text-sky-500"
        >
          Data Table
        </Link>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import axiosInstance from "../api/axiosInstance";

const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function Homepage() {
  // Store data secara state react nya
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const limit = 5;
  // fetch data => fetch / axios
  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/shops");
        const data = response.data;
        if (data.isSuccess) {
          setShops(data.data.shops);
          setFilter(data.data.shops);
        } else {
          setError("error");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);
  // Filter
  useEffect(() => {
    const filtered = shops.filter((shop) =>
      shop.products[0].name.includes(search)
    );
    setFilter(filtered);
    setPage(1);
  }, [search, shops]);
  // Pagination
  const totalData = page * limit;
  const pageData = totalData - limit;
  const currentShops = filter.slice(pageData, totalData);
  const pagination = (pageNumber) => {
    setPage(pageNumber);
  };
  const totalPages = Math.ceil(filter.length / limit);
  return (
    <>
      <header className="flex justify-between p-4 bg-white shadow-md">
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3 tex">
            <div className="max-w-xl">
              <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                Meet our leadership
              </h2>
              <p className="mt-6 text-lg/8 text-gray-600">
                We’re a dynamic group of individuals who are passionate about
                what we do and dedicated to delivering the best results for our
                clients.
              </p>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center gap-x-6">
                    <img
                      alt=""
                      src={person.imageUrl}
                      className="h-16 w-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                        {person.name}
                      </h3>
                      <p className="text-sm/6 font-semibold text-indigo-600">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
      <main className="text-center">
        <div className="mt-8 mb-4">
          <input
            type="text"
            placeholder="Search by shop name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        {loading && <p> loading . . . .</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentShops.length === 0 ? (
              <p className="text-gray-500 items-center">No Data Available</p>
            ) : (
              currentShops.map((shop, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md bg-white shadow-md"
                >
                  <img
                    src={shop.products[0].images[0]}
                    alt={shop.products[0].name}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="font-semibold text-blue-950">
                    {shop.products[0].name}
                  </h3>
                  <p className="text-green-500 font-bold">
                    Rp. {shop.products[0].price} / Hari
                  </p>
                  <p className="text-gray-600 mt-2 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
                    <span>4 orang</span>
                    <span>Manual</span>
                    <span>Tahun 2020</span>
                  </div>
                  <button className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md">
                    Pilih Mobil
                  </button>
                </div>
              ))
            )}
          </section>
        )}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => pagination(i + 1)}
              className={`px-4 py-2 mx-1 ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </>
  );
}
export default Homepage;

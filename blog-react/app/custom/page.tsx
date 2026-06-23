"use client";

import { useMemo, useState } from "react";

export default function UsersPage() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com" },
    { id: 5, name: "Tom Brown", email: "tom@example.com" },
    { id: 6, name: "Emma Davis", email: "emma@example.com" },
    { id: 7, name: "David Miller", email: "david@example.com" },
    { id: 8, name: "Lisa Taylor", email: "lisa@example.com" },
    { id: 9, name: "Chris Anderson", email: "chris@example.com" },
    { id: 10, name: "Olivia Thomas", email: "olivia@example.com" },
    { id: 11, name: "James White", email: "james@example.com" },
    { id: 12, name: "Sophia Martin", email: "sophia@example.com" },
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(
    filteredUsers.length / rowsPerPage
  );

  const startIndex = (currentPage - 1) * rowsPerPage;

  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <h1 className="text-2xl font-bold">
          Users Management
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={handleSearch}
            className="border rounded-lg px-4 py-2 w-72"
          />

          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded-lg px-3 py-2"
          >
            <option value={5}>5 Rows</option>
            <option value={10}>10 Rows</option>
            <option value={15}>15 Rows</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="text-left p-3 border-b">
                ID
              </th>
              <th className="text-left p-3 border-b">
                Name
              </th>
              <th className="text-left p-3 border-b">
                Email
              </th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50"
                >
                  <td className="p-3 border-b">
                    {user.id}
                  </td>
                  <td className="p-3 border-b">
                    {user.name}
                  </td>
                  <td className="p-3 border-b">
                    {user.email}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-8"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-5">
        <p className="text-sm text-gray-600">
          Showing {currentUsers.length} of{" "}
          {filteredUsers.length} users
        </p>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages || 1 },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`px-4 py-2 border rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            className="px-4 py-2 border rounded disabled:opacity-50"
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
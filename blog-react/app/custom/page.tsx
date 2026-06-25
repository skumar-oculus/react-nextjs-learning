"use client";

import { useMemo, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([
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
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Add User States
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Edit User States
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalPages = Math.ceil(
    filteredUsers.length / rowsPerPage
  );

  const startIndex = (currentPage - 1) * rowsPerPage;

  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Create User
  const handleAddUser = () => {
    if (!newName.trim() || !newEmail.trim()) return;

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === newEmail.toLowerCase()
    );

    if (emailExists) {
      alert("Email already exists
      ");
      return;
    }

    const newUser = {
      id:
        users.length > 0
          ? Math.max(...users.map((u) => u.id)) + 1
          : 1,
      name: newName,
      email: newEmail,
    };

    setUsers((prev) => [...prev, newUser]);

    setNewName("");
    setNewEmail("");
  };

  // Edit User
  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  // Update User
  const handleUpdate = () => {
    if (!name.trim() || !email.trim()) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === editingId
          ? { ...user, name, email }
          : user
      )
    );

    setEditingId(null);
    setName("");
    setEmail("");
  };

  // Delete User
  const handleDelete = (id) => {
    if (window.confirm("Delete user?")) {
      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );

      const remainingUsers = users.length - 1;
      const updatedPages = Math.ceil(
        remainingUsers / rowsPerPage
      );

      if (currentPage > updatedPages) {
        setCurrentPage(Math.max(updatedPages, 1));
      }
    }
  };

  // Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Users Management
      </h1>

      {/* Add User */}
      <div className="border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          Add New User
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter name"
            value={newName}
            onChange={(e) =>
              setNewName(e.target.value)
            }
            className="border rounded-lg px-4 py-2 flex-1"
          />

          <input
            type="email"
            placeholder="Enter email"
            value={newEmail}
            onChange={(e) =>
              setNewEmail(e.target.value)
            }
            className="border rounded-lg px-4 py-2 flex-1"
          />

          <button
            onClick={handleAddUser}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Add User
          </button>
        </div>
      </div>

      {/* Edit Form */}
      {editingId && (
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border rounded-lg px-4 py-2 flex-1"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border rounded-lg px-4 py-2 flex-1"
          />

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Update
          </button>

          <button
            onClick={() => {
              setEditingId(null);
              setName("");
              setEmail("");
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Search + Rows */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={handleSearch}
          className="border rounded-lg px-4 py-2 w-full md:w-80"
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

      {/* Table */}
      <div className="overflow-hidden border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="text-left p-3 border-b">ID</th>
              <th className="text-left p-3 border-b">Name</th>
              <th className="text-left p-3 border-b">Email</th>
              <th className="text-left p-3 border-b">
                Actions
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

                  <td className="p-3 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleEdit(user)
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(user.id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-5">
        <p className="text-sm text-gray-600">
          Showing {currentUsers.length} of{" "}
          {filteredUsers.length} users
        </p>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="px-4 py-2 border rounded disabled:opacity-50"
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
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
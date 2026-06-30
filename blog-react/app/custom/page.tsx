"use client";

import { useMemo, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "9876542170",
      position: "Manager",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9976543211",
      position: "Developer",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "9876543212",
      position: "Designer",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "9876543213",
      position: "HR",
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom@example.com",
      phone: "9876543214",
      position: "QA Engineer",
    },
    {
      id: 6,
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "9876543215",
      position: "Developer",
    },
    {
      id: 7,
      name: "David Miller",
      email: "david@example.com",
      phone: "9876543216",
      position: "Team Lead",
    },
    {
      id: 8,
      name: "Lisa Taylor",
      email: "lisa@example.com",
      phone: "9876543217",
      position: "Designer",
    },
    {
      id: 9,
      name: "Chris Anderson",
      email: "chris@example.com",
      phone: "9876543218",
      position: "Intern",
    },
    {
      id: 10,
      name: "Olivia Thomas",
      email: "olivia@example.com",
      phone: "9876543219",
      position: "Product Manager",
    },
    {
      id: 11,
      name: "James White",
      email: "james@example.com",
      phone: "9876543220",
      position: "Developer",
    },
    {
      id: 12,
      name: "Sophia Martin",
      email: "sophia@example.com",
      phone: "9876543221",
      position: "HR",
    },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Add Modal
  const [showAddModal, setShowAddModal] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPosition, setNewPosition] = useState("");

  // Edit
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  // Delete
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search) ||
        user.position.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;

  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Add User
  const handleAddUser = () => {
    if (!newName || !newEmail || !newPhone || !newPosition) return;

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === newEmail.toLowerCase()
    );

    if (emailExists) {
      alert("Email already exists");
      return;
    }

    const newUser = {
      id: users.length
        ? Math.max(...users.map((u) => u.id)) + 1
        : 1,
      name: newName,
      email: newEmail,
      phone: newPhone,
      position: newPosition,
    };

    setUsers((prev) => [...prev, newUser]);

    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewPosition("");

    setShowAddModal(false);
  };

  // Edit User
  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setPosition(user.position);
  };

  const handleUpdate = () => {
    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.id !== editingId
    );

    if (emailExists) {
      alert("Email already exists");
      return;
    }

    setUsers((prev) =>
      prev.map((user) =>
        user.id === editingId
          ? {
              ...user,
              name,
              email,
              phone,
              position,
            }
          : user
      )
    );

    setEditingId(null);
    setName("");
    setEmail("");
    setPhone("");
    setPosition("");
  };

  const handleDeleteClick = (user) => {
    setDeleteId(user.id);
    setDeleteName(user.name);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = users.filter(
      (user) => user.id !== deleteId
    );

    setUsers(updated);

    const pages = Math.ceil(updated.length / rowsPerPage);

    if (currentPage > pages) {
      setCurrentPage(Math.max(1, pages));
    }

    setDeleteId(null);
    setDeleteName("");
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setDeleteName("");
    setShowDeleteModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Users Management
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          + Add User
        </button>
      </div>
            {/* Edit User */}
            {editingId && (
        <div className="border rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Edit User
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />

            <input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />

            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white rounded-lg px-4 py-2"
            >
              Update
            </button>

            <button
              onClick={() => setEditingId(null)}
              className="bg-gray-500 text-white rounded-lg px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search + Rows */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-5">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2 w-full md:w-80"
        />

        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2"
        >
          <option value={5}>5 Rows</option>
          <option value={10}>10 Rows</option>
          <option value={15}>15 Rows</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 border-b">ID</th>
              <th className="text-left p-3 border-b">Name</th>
              <th className="text-left p-3 border-b">Email</th>
              <th className="text-left p-3 border-b">Phone</th>
              <th className="text-left p-3 border-b">Position</th>
              <th className="text-left p-3 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 border-b">{user.id}</td>
                  <td className="p-3 border-b">{user.name}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b">{user.phone}</td>
                  <td className="p-3 border-b">
                    {user.position}
                  </td>

                  <td className="p-3 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteClick(user)
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
                  colSpan={6}
                  className="text-center py-6"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-5 gap-4">
        <p className="text-sm text-gray-600">
          Showing {currentUsers.length} of{" "}
          {filteredUsers.length} users
        </p>

        <div className="flex items-center gap-2">
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
            {/* Add User Modal */}
            {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6">
            <h2 className="text-2xl font-semibold mb-5">
              Add New User
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border rounded-lg px-4 py-2"
              />

              <input
                type="email"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border rounded-lg px-4 py-2"
              />

              <input
                type="text"
                placeholder="Phone"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="border rounded-lg px-4 py-2"
              />

              <input
                type="text"
                placeholder="Position"
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
                className="border rounded-lg px-4 py-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewName("");
                  setNewEmail("");
                  setNewPhone("");
                  setNewPosition("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAddUser}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Confirm Delete
            </h2>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold text-red-600">
                {deleteName}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-500 text-white"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
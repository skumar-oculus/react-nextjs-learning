"use client";

import { useState, useEffect, useMemo } from "react";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Add
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPosition, setNewPosition] = useState("");

  // Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  // Delete
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // FILTER
  const filteredUsers = useMemo(() => {
    const keyword = (search || "").toLowerCase();
  
    return users.filter((u) =>
      (u.name || "").toLowerCase().includes(keyword) ||
      (u.email || "").toLowerCase().includes(keyword) ||
      (u.phone || "").includes(search || "") ||
      (u.position || "").toLowerCase().includes(keyword)
    );
  }, [users, search]);

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const currentUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, currentPage, rowsPerPage]);

  // RESET PAGE ON SEARCH / ROW CHANGE
  const handleSearch = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleRowsChange = (val) => {
    setRowsPerPage(Number(val));
    setCurrentPage(1);
  };

  // ADD
  const handleAddUser = () => {
    if (!newName || !newEmail || !newPhone || !newPosition) return;

    const exists = users.some(
      (u) => u.email.toLowerCase() === newEmail.toLowerCase()
    );

    if (exists) return alert("Email already exists");

    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
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

  // EDIT
  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setPosition(user.position);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingId
          ? { ...u, name, email, phone, position }
          : u
      )
    );

    setShowEditModal(false);
    setEditingId(null);
  };

  // DELETE
  const handleDeleteClick = (user) => {
    setDeleteId(user.id);
    setDeleteName(user.name);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = users.filter((u) => u.id !== deleteId);
    setUsers(updated);

    const newTotalPages = Math.ceil(updated.length / rowsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(Math.max(1, newTotalPages));
    }

    setShowDeleteModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* ADD */}
      <button
        onClick={() => setShowAddModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add User
      </button>

      {/* SEARCH + ROWS */}
      <div className="flex gap-4 mb-4">
        <input
          className="border p-2"
          placeholder="Search..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <select
          className="border p-2"
          value={rowsPerPage}
          onChange={(e) => handleRowsChange(e.target.value)}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Position</th><th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((u) => (
            <tr key={u.id} className="border-t">
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.position}</td>
              <td>
                <button onClick={() => handleEdit(u)} className="bg-yellow-500 px-2 py-1 text-white mr-2">
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(u)} className="bg-red-500 px-2 py-1 text-white">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-4 items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border"
        >
          Next
        </button>
      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 w-[400px]">
            <h2>Edit User</h2>

            <input value={name} onChange={(e) => setName(e.target.value)} className="border w-full p-2" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="border w-full p-2" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="border w-full p-2" />
            <input value={position} onChange={(e) => setPosition(e.target.value)} className="border w-full p-2" />

            <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 mt-3">
              Update
            </button>

            <button onClick={() => setShowEditModal(false)} className="ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 w-[400px]">
            <input placeholder="Name" className="border w-full p-2" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <input placeholder="Email" className="border w-full p-2" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            <input placeholder="Phone" className="border w-full p-2" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
            <input placeholder="Position" className="border w-full p-2" value={newPosition} onChange={(e) => setNewPosition(e.target.value)} />

            <button onClick={handleAddUser} className="bg-green-600 text-white px-3 py-1 mt-3">
              Add
            </button>

            <button onClick={() => setShowAddModal(false)} className="ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 w-[300px]">
            <p>Delete {deleteName}?</p>

            <button onClick={confirmDelete} className="bg-red-600 text-white px-3 py-1 mt-3">
              Delete
            </button>

            <button onClick={() => setShowDeleteModal(false)} className="ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
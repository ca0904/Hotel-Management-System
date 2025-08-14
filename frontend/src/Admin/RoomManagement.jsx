import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading,   setLoading] = useState(false);
  const [error,     setError]   = useState(null);
  const [newRoom,   setNewRoom] = useState({
    roomNo: '', cost: '', capacity: '', typeName: ''
  });

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8080/api/room/all');
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setRooms(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewRoom(r => ({ ...r, [name]: value }));
  };

  const addRoom = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/room/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoom),
      });
      if (!res.ok) throw new Error(await res.text());
      // clear form
      setNewRoom({ roomNo: '', cost: '', capacity: '', typeName: '' });
      // re-fetch list
      await fetchRooms();
    } catch (e) {
      alert('Failed to add room: ' + e.message);
    }
  };

  const deleteRoom = async (roomNo) => {
    if (!window.confirm(`Really delete room ${roomNo}?`)) return;
    try {
      const res = await fetch(`http://localhost:8080/api/room/${roomNo}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchRooms();
    } catch (e) {
      alert('Failed to delete room: ' + e.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="flex-grow container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Room Management</h2>

        {/* Add Room Form */}
        <form onSubmit={addRoom} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            name="roomNo" value={newRoom.roomNo} onChange={handleChange}
            placeholder="Room No" required className="border p-2 rounded"
          />
          <input
            name="cost" type="number" value={newRoom.cost} onChange={handleChange}
            placeholder="Cost" required className="border p-2 rounded"
          />
          <input
            name="capacity" type="number" value={newRoom.capacity} onChange={handleChange}
            placeholder="Capacity" required className="border p-2 rounded"
          />
          <input
            name="typeName" value={newRoom.typeName} onChange={handleChange}
            placeholder="Type Name" required className="border p-2 rounded"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add Room
          </button>
        </form>

        {/* Room List */}
        {loading && <p>Loading rooms…</p>}
        {error   && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Room No</th>
                <th className="border p-2">Cost</th>
                <th className="border p-2">Capacity</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(r => (
                <tr key={r.roomNo}>
                  <td className="border p-2">{r.roomNo}</td>
                  <td className="border p-2">{r.cost}</td>
                  <td className="border p-2">{r.capacity}</td>
                  <td className="border p-2">{r.typeName}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => deleteRoom(r.roomNo)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <AdminFooter />
    </div>
  );
};

export default RoomManagement;

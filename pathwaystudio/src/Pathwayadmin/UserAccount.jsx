import { useEffect, useState } from "react";

export default function UserAccount() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`
      );

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="container mt-4">
      <h4 className="mb-4">User Accounts</h4>

      {users.length === 0 && (
        <p className="text-muted">No users found.</p>
      )}

      {users.map((user) => (
        <div
          key={user._id}
          className="card shadow-sm mb-3 p-3 rounded-3"
        >
          <h5 className="mb-2">{user.name}</h5>

          <p className="mb-1">
            <strong>Email:</strong> {user.email}
          </p>

          <p className="mb-1">
            <strong>Date of Birth:</strong> {user.dob}
          </p>

          <p className="mb-0 text-muted">
            <strong>Account Created:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

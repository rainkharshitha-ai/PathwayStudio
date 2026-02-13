import React, { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================
  // FETCH MESSAGES
  // ======================
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/messages");

      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Unable to load messages");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // DELETE MESSAGE
  // ======================
  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:4000/api/messages/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      // remove from UI
      setMessages((prev) =>
        prev.filter((msg) => msg._id !== id)
      );
    } catch (err) {
      alert("Failed to delete message");
    }
  };

  // ======================
  // UI
  // ======================
  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Messages</h2>

      {messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p><b>Name:</b> {msg.name}</p>
            <p><b>Email:</b> {msg.email}</p>
            <p><b>Message:</b> {msg.message}</p>
            <p>
              <b>Date:</b>{" "}
              {msg.createdAt
                ? new Date(msg.createdAt).toLocaleString()
                : "N/A"}
            </p>

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteMessage(msg._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;

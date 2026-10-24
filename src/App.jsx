import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => console.error("خطا:", err));
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    const newUser = { id: Date.now(), name, email };
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  if (loading) return <h2 className="brutal-loading">LOADING DATA...</h2>;

  return (
    <div className="brutal-container">
      <h1 className="brutal-title">USER LIST // CRUD</h1>

      <form className="brutal-form" onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="NAME"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="brutal-input"
        />
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="brutal-input"
        />
        <button type="submit" className="brutal-btn brutal-btn-add">
          + ADD USER
        </button>
      </form>

      <ul className="brutal-list">
        {users.map((user) => (
          <li key={user.id} className="brutal-item">
            <div className="brutal-user-info">
              <span className="brutal-name">{user.name}</span>
              <span className="brutal-email">{user.email}</span>
            </div>
            <button
              className="brutal-btn brutal-btn-delete"
              onClick={() => handleDeleteUser(user.id)}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

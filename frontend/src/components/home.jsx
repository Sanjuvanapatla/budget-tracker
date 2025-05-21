import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import "./home.css";

function Home() {
  const [summary, setSummary] = useState({});
  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [perDay, setPerDay] = useState(0);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const navigate = useNavigate(); // <-- initialize navigation

  const categories = [
    "Food",
    "Shopping",
    "Home",
    "Transport",
    "Health",
    "Utilities",
    "Other",
  ];

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = () => {
    axios.get("http://localhost:5000/api/expenses/summary").then((res) => {
      setSummary(res.data.summary);
      setTotal(res.data.total);
      setRemaining(res.data.remaining);
      setPerDay(res.data.perDay);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount.");
      return;
    }

    axios
      .post("http://localhost:5000/api/expenses/add", {
        amount: parseFloat(amount),
        category: category,
      })
      .then(() => {
        setAmount("");
        setCategory("Food");
        fetchSummary();
      })
      .catch((err) => {
        console.error("Error adding expense:", err);
      });
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/signin"); // redirect to signin
  };

  return (
    <div className="App">
        <div className="nav-btn"> <h2 className="expense-h2">Expense Tracker</h2>

      {/* ✅ Add Logout Button */}
      <button onClick={handleLogout} className="logoutBtn">
        Logout
      </button>
</div>
     
      <div className="container">
        <div>
          <div className="amount-1">
            <label>Amount: </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="Enter amount"
            />
          </div>

          <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <div className="amount-1">
              <label>Category: </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="addBtn">Add Expense</button>
          </form>
        </div>

        <div className="expense-category">
          <h4 className="expences-h4">Expenses By Category:</h4>
          <ol className="category-list">
            {Object.entries(summary).map(([cat, amt]) => (
              <li key={cat}>
                {cat}: ₹{amt.toFixed(2)}
              </li>
            ))}
          </ol>
          <div>
            <p className="total-p">
              <strong>Total Spent:</strong> ₹{total.toFixed(2)}
            </p>
            <p className="total-p">
              <strong>Budget Remaining:</strong> ₹{remaining.toFixed(2)}
            </p>
            <p className="total-p">
              <strong>Per Day Budget:</strong> Rs.{parseFloat(perDay).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

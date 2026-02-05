import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend
} from "recharts";

const cardStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  marginBottom: "20px"
};

const primaryBlue = "#2563eb";

function App() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);

  const [income, setIncome] = useState(0);
  const [incomeInput, setIncomeInput] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // FETCH DATA
  useEffect(() => {
    fetch("http://localhost:5000/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data));

    fetch("http://localhost:5000/income")
      .then(res => res.json())
      .then(data => data && setIncome(Number(data.amount)));
  }, []);

  // ADD EXPENSE
  const addExpense = () => {
    fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, category, description }),
    })
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        setAmount("");
        setCategory("");
        setDescription("");
      });
  };

  // SAVE INCOME
  const saveIncome = () => {
    fetch("http://localhost:5000/income", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: incomeInput }),
    })
      .then(res => res.json())
      .then(data => {
        setIncome(Number(data.amount));
        setIncomeInput("");
      });
  };

  // DELETE
  const deleteExpense = (id) => {
    fetch(`http://localhost:5000/expenses/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => setExpenses(data));
  };

  // UPDATE
  const updateExpense = (id) => {
    fetch(`http://localhost:5000/expenses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: editAmount,
        category: editCategory,
        description: editDescription,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        setEditingId(null);
      });
  };

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const balance = income - totalSpent;

  let statusText = "";
  let statusColor = "";

  if (balance > 0) {
    statusText = "You are saving well 💙";
    statusColor = "green";
  } else if (balance === 0) {
    statusText = "You are breaking even ⚖️";
    statusColor = "orange";
  } else {
    statusText = "Overspending alert 🚨";
    statusColor = "red";
  }

  // CATEGORY SUMMARY
  const categorySummary = {};
  expenses.forEach(e => {
    categorySummary[e.category] =
      (categorySummary[e.category] || 0) + Number(e.amount);
  });

  const chartData = Object.entries(categorySummary).map(
    ([name, value]) => ({ name, value })
  );

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh", padding: "30px" }}>
      <h1 style={{ color: primaryBlue, marginBottom: "20px" }}>
        💰 Finance Dashboard
      </h1>

      {/* SUMMARY CARDS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ ...cardStyle, flex: 1 }}>
          <h3>Income</h3>
          <h2>₹{income}</h2>
          <input
            placeholder="Enter income"
            value={incomeInput}
            onChange={e => setIncomeInput(e.target.value)}
          />
          <button onClick={saveIncome} style={{ marginLeft: "10px" }}>
            Save
          </button>
        </div>

        <div style={{ ...cardStyle, flex: 1 }}>
          <h3>Total Spent</h3>
          <h2>₹{totalSpent}</h2>
        </div>

        <div style={{ ...cardStyle, flex: 1 }}>
          <h3>Balance</h3>
          <h2 style={{ color: balance >= 0 ? "green" : "red" }}>
            ₹{balance}
          </h2>
          <p style={{ color: statusColor, fontWeight: "bold" }}>
            {statusText}
          </p>
        </div>
      </div>

      {/* ADD EXPENSE */}
      <div style={cardStyle}>
        <h3>Add Expense</h3>
        <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <br /><br />
        <button onClick={addExpense}>Add</button>
      </div>

      {/* EXPENSE LIST */}
      <div style={cardStyle}>
        <h3>Expenses</h3>
        {expenses.map(exp => (
          <div key={exp._id} style={{ marginBottom: "10px" }}>
            {editingId === exp._id ? (
              <>
                <input value={editAmount} onChange={e => setEditAmount(e.target.value)} />
                <input value={editCategory} onChange={e => setEditCategory(e.target.value)} />
                <input value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                <button onClick={() => updateExpense(exp._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                ₹{exp.amount} — {exp.category} — {exp.description}
                <button
                  onClick={() => {
                    setEditingId(exp._id);
                    setEditAmount(exp.amount);
                    setEditCategory(exp.category);
                    setEditDescription(exp.description);
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteExpense(exp._id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* CHART */}
      <div style={cardStyle}>
        <h3>Spending Distribution</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            fill={primaryBlue}
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default App;

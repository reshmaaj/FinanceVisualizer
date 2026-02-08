import { useState } from "react";
import { useNavigate } from "react-router-dom";


const primaryBlue = "#2563eb";

const pageStyle = {
    padding: "32px",
    background: "#f1f5f9",
    minHeight: "100vh",
};

const card = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    marginBottom: "24px",
    maxWidth: "520px",
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    marginTop: "6px",
    marginBottom: "14px",
    fontSize: "15px",
};

const buttonPrimary = {
    background: primaryBlue,
    color: "#ffffff",
    padding: "14px",
    width: "100%",
    borderRadius: "12px",
    border: "none",
    fontWeight: 600,
    fontSize: "15px",
    cursor: "pointer",
};



function Home() {
    const navigate = useNavigate();

    const [incomeInput, setIncomeInput] = useState("");
    const [categoryExpenses, setCategoryExpenses] = useState({
        Food: "",
        Rent: "",
        Travel: "",
        Entertainment: "",
        Other: "",
    });

    const saveAll = async () => {
        // save income
        await fetch("http://localhost:5000/income", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: incomeInput }),
        });

        // save expenses
        for (const category in categoryExpenses) {
            const amount = categoryExpenses[category];
            if (amount && Number(amount) > 0) {
                await fetch("http://localhost:5000/expenses", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount,
                        category,
                        description: "Monthly expense",
                    }),
                });
            }
        }

        navigate("/insights");
    };

    return (
        <div style={pageStyle}>
            <h1 style={{ fontSize: "28px", marginBottom: "6px" }}>
                Enter Your Financial Details
            </h1>
            <p style={{ color: "#64748b", marginBottom: "28px" }}>
                Monthly Overview
            </p>

            {/* INCOME CARD */}
            <div style={card}>
                <h3 style={{ marginBottom: "12px" }}>Total Income</h3>

                <input
                    type="number"
                    placeholder="₹ Enter monthly income"
                    value={incomeInput}
                    onChange={(e) => setIncomeInput(e.target.value)}
                    style={inputStyle}
                />
            </div>

            {/* EXPENSE CARD */}
            <div style={card}>
                <h3 style={{ marginBottom: "16px" }}>Monthly Spending</h3>

                {Object.keys(categoryExpenses).map((cat) => (
                    <div key={cat} style={{ marginBottom: "10px" }}>
                        <label style={{ fontSize: "14px", color: "#475569" }}>
                            {cat}
                        </label>
                        <input
                            type="number"
                            placeholder={`₹`}
                            value={categoryExpenses[cat]}
                            onChange={(e) =>
                                setCategoryExpenses({
                                    ...categoryExpenses,
                                    [cat]: e.target.value,
                                })
                            }
                            style={inputStyle}
                        />
                    </div>
                ))}

                <button onClick={saveAll} style={buttonPrimary}>
                    Calculate
                </button>
            </div>
        </div>
    );
}

export default Home;

import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    RadialBarChart,
    RadialBar,
    PolarAngleAxis
} from "recharts";

const COLORS = ["#2563eb", "#22c55e", "#f97316", "#ef4444", "#a855f7"];

const page = {
    minHeight: "100vh",
    background: "#f1f5f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const container = {
    maxWidth: "1100px",
    width: "100%",
    padding: "32px"
};

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px"
};

const card = {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    textAlign: "center"
};

function Insights() {
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/expenses")
            .then(res => res.json())
            .then(setExpenses)
            .catch(console.error);

        fetch("http://localhost:5000/income")
            .then(res => res.json())
            .then(data => setIncome(data?.amount || 0))
            .catch(console.error);
    }, []);

    const totalSpent = expenses.reduce(
        (sum, e) => sum + Number(e.amount || 0),
        0
    );

    const savings = income - totalSpent;

    const savingPercent =
        income > 0
            ? Math.min(Math.round((savings / income) * 100), 100)
            : 0;

    const categoryData = Object.values(
        expenses.reduce((acc, e) => {
            acc[e.category] = acc[e.category] || {
                name: e.category,
                value: 0
            };
            acc[e.category].value += Number(e.amount || 0);
            return acc;
        }, {})
    );

    const gaugeColor =
        savingPercent >= 30
            ? "#22c55e"
            : savingPercent >= 10
                ? "#f97316"
                : "#ef4444";

    const gaugeData = [
        { name: "Savings", value: savingPercent }
    ];

    return (
        <div style={page}>
            <div style={container}>
                <h1 style={{ textAlign: "center" }}>Insights Dashboard</h1>
                <p
                    style={{
                        textAlign: "center",
                        color: "#64748b",
                        marginBottom: "32px"
                    }}
                >
                    Monthly expense summary & savings health
                </p>

                {/* SUMMARY */}
                <div style={grid}>
                    <div style={card}>
                        <h3>Income</h3>
                        <h2>₹ {income}</h2>
                    </div>

                    <div style={card}>
                        <h3>Spent</h3>
                        <h2>₹ {totalSpent}</h2>
                    </div>

                    <div style={card}>
                        <h3>Savings</h3>
                        <h2 style={{ color: gaugeColor }}>₹ {savings}</h2>
                        <p>{savingPercent}% saved</p>
                    </div>
                </div>

                <div style={{ ...grid, marginTop: "32px" }}>
                    {/* PIE CHART */}
                    <div style={card}>
                        <h3>Expense Insights</h3>
                        <PieChart width={280} height={280}>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                                animationDuration={1200}
                            >
                                {categoryData.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={COLORS[i % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>

                    {/* BAR CHART */}
                    <div style={card}>
                        <h3>Category Comparison</h3>
                        <BarChart
                            width={300}
                            height={250}
                            data={categoryData}
                        >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="value"
                                fill="#2563eb"
                                radius={[8, 8, 0, 0]}
                                animationDuration={1200}
                            />
                        </BarChart>
                    </div>

                    {/* SPEEDOMETER */}
                    <div style={card}>
                        <h3>Savings Meter</h3>

                        <RadialBarChart
                            width={280}
                            height={180}
                            cx="50%"
                            cy="100%"
                            innerRadius="70%"
                            outerRadius="100%"
                            startAngle={180}
                            endAngle={0}
                            data={gaugeData}
                        >
                            <PolarAngleAxis
                                type="number"
                                domain={[0, 100]}
                                tick={false}
                            />

                            <RadialBar
                                dataKey="value"
                                fill={gaugeColor}
                                cornerRadius={12}
                                background={{ fill: "#e5e7eb" }}
                                animationDuration={1400}
                            />
                        </RadialBarChart>

                        <h2
                            style={{
                                marginTop: "-12px",
                                color: gaugeColor
                            }}
                        >
                            {savingPercent}%
                        </h2>

                        <p style={{ color: "#64748b" }}>
                            Savings Health
                        </p>
                    </div>
                </div>

                {/* REVIEW */}
                <div style={{ ...card, marginTop: "32px" }}>
                    <h3>Monthly Review</h3>
                    <p>
                        {savingPercent >= 30
                            ? "Excellent! You are saving consistently."
                            : savingPercent >= 10
                                ? "Good start. Try reducing non-essential expenses."
                                : "Warning: Spending is too high. Budget tighter next month."}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Insights;

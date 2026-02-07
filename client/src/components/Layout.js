import { NavLink } from "react-router-dom";

const sidebarStyle = {
    width: "240px",
    background: "#0f172a",
    color: "#fff",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
};

const linkStyle = {
    padding: "12px 16px",
    borderRadius: "10px",
    fontWeight: 500
};

export default function Layout({ children }) {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>

            {/* SIDEBAR */}
            <aside style={sidebarStyle}>
                <h2 style={{ color: "#38bdf8" }}>Finance</h2>

                <NavLink
                    to="/"
                    style={({ isActive }) => ({
                        ...linkStyle,
                        background: isActive ? "#1e293b" : "transparent"
                    })}
                >
                    🏠 Home
                </NavLink>

                <NavLink
                    to="/insights"
                    style={({ isActive }) => ({
                        ...linkStyle,
                        background: isActive ? "#1e293b" : "transparent"
                    })}
                >
                    📊 Insights
                </NavLink>
            </aside>

            {/* MAIN CONTENT */}
            <main style={{ flex: 1, padding: "32px" }}>
                {children}
            </main>

        </div>
    );
}

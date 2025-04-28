import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
const Sidebar = ({ showNavbar, setShowNavbar }) => {
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={`sidebar ${showNavbar && "toggle-bar"}`}>
      <h2 className="sidebar__logo">finance</h2>
      <button onClick={handleLogout} className="logout-btn" disabled={isPending}>
        {isPending ? "Logging out..." : "Logout"}
      </button>
      {!showNavbar && (
        <nav className="sidebar__menu">
          <NavLink to="/" className="sidebar__item">
            <img
              src="/images/icon-nav-overview.svg"
              alt="Overview"
              className="sidebar__icon"
            />
            <span>Overview</span>
          </NavLink>
          <NavLink to="/transactions" className="sidebar__item">
            <img
              src="/images/icon-nav-transactions.svg"
              alt="Transactions"
              className="sidebar__icon"
            />
            <span>Transactions</span>
          </NavLink>
          <NavLink to="/budget" className="sidebar__item">
            <img
              src="/images/icon-nav-budgets.svg"
              alt="Budgets"
              className="sidebar__icon"
            />
            <span>Budgets</span>
          </NavLink>
          <NavLink to="/pots" className="sidebar__item">
            <img
              src="/images/icon-nav-pots.svg"
              alt="Pots"
              className="sidebar__icon"
            />
            <span>Pots</span>
          </NavLink>
          <NavLink to="/recurringBills" className="sidebar__item">
            <img
              src="/images/icon-nav-recurring-bills.svg"
              alt="Recurring Bills"
              className="sidebar__icon"
            />
            <span>Recurring Bills</span>
          </NavLink>
        </nav>
      )}
      {showNavbar && (
        <nav className="sidebar__menu">
          <NavLink to="/" className="sidebar__item">
            <img
              src="/images/icon-nav-overview.svg"
              alt="Overview"
              className="sidebar__icon"
            />
          </NavLink>
          <NavLink to="/transactions" className="sidebar__item">
            <img
              src="/images/icon-nav-transactions.svg"
              alt="Transactions"
              className="sidebar__icon"
            />
          </NavLink>
          <NavLink to="/budget" className="sidebar__item">
            <img
              src="/images/icon-nav-budgets.svg"
              alt="Budgets"
              className="sidebar__icon"
            />
          </NavLink>
          <NavLink to="/pots" className="sidebar__item">
            <img
              src="/images/icon-nav-pots.svg"
              alt="Pots"
              className="sidebar__icon"
            />
          </NavLink>
          <NavLink to="/recurringBills" className="sidebar__item">
            <img
              src="/images/icon-nav-recurring-bills.svg"
              alt="Recurring Bills"
              className="sidebar__icon"
            />
          </NavLink>
        </nav>
      )}
      <div
        onClick={() => setShowNavbar(!showNavbar)}
        className="sidebar__minimize"
      >
        <img
          src="/images/icon-minimize-menu.svg"
          alt="Minimize Menu"
          className="sidebar__icon"
        />
        {!showNavbar && <span>Minimize Menu</span>}
      </div>
    </div>
  );
};

export default Sidebar;

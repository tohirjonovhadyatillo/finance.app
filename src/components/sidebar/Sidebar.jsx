import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar__logo">finance</h2>
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
      <div className="sidebar__minimize">
        <img
          src="/images/icon-minimize-menu.svg"
          alt="Minimize Menu"
          className="sidebar__icon"
        />
        <span>Minimize Menu</span>
      </div>
    </div>
  );
};

export default Sidebar;

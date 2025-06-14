import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminMain from "./AdminMain";
import "./admin.css";
export default function AdminDashboard() {
  return (
    <section className="admin-dashboard">
      <AdminSideBar />
      <AdminMain />
    </section>
  );
}

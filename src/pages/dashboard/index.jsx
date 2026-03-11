// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Dashboard = () => {
  // fake data
  const stats = {
    total: 120,
    active: 95,
    outOfStock: 25,
  };

  const chartData = [
    { category: "Laptop", total: 40 },
    { category: "Phone", total: 30 },
    { category: "Tablet", total: 20 },
    { category: "Accessory", total: 30 },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* Title */}
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold mt-2">{stats.total}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Active Products</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {stats.active}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Out of Stock</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {stats.outOfStock}
          </h2>
        </div>

      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded-xl p-6">

        <h2 className="text-lg font-semibold mb-4">
          Products by Category
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="category" />
            <YAxis />

            <Tooltip />

            <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default Dashboard;
import {
  Search,
  Package,
  Inbox,
  Handshake,
  MapPin,
  Heart,
  Bell,
  User,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavItem = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition text-left"
  >
    <Icon size={22} />
    <span className="text-lg font-medium">{label}</span>
  </button>
);

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { onClick: () => navigate("/items"), icon: Search, label: "Browse" },
    { onClick: () => navigate("/myitems"), icon: Package, label: "My Items" },
    { onClick: () => navigate("/inbox"), icon: Inbox, label: "Inbox" },
    { onClick: () => navigate("/deals"), icon: Handshake, label: "Deals" },
    { onClick: () => navigate("/lostfound"), icon: MapPin, label: "Lost & Found" },
    { onClick: () => navigate("/wanted"), icon: Heart, label: "Wanted" },
  ];

  return (
    <aside className="w-72 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      {/* Logo */}
      <div onClick={() => navigate('/')}
      className="flex items-center gap-3 px-6 py-6 border-b">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">C</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">CollegeNet</h1>
          <p className="text-sm text-gray-500">Connect.Trade.Belong.</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavItem {...item} />
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 w-full border-t p-4 space-y-2">
        <button onClick={() => navigate("/notification")} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-100 transition">
          <Bell size={22} />
          <span className="text-lg">Notifications</span>
        </button>

        <button onClick={() => navigate("/profile")} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-100 transition">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <div className="text-left">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500">View Profile</p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
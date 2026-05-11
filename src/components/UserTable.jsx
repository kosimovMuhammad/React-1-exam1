import React, { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import {
  Search,
  Plus,
  MoreVertical,
  UserCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { UserModal } from "./UserModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const UserTable = () => {
  const {
    users,
    searchQuery,
    filterStatus,
    setSearchQuery,
    setFilterStatus,
    deleteUser,
  } = useUserStore();

  const [modal, setModal] = useState({
    open: false,
    mode: "add",
    user: null,
  });

  const filteredData = users.filter((u) => {
    const matchesSearch = u.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || u.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-[1200px] mx-auto    font-sans antialiased">
      <h1 className="text-[34px] font-bold text-[#1A1D1F] mb-8">Cards</h1>

      <div className="flex gap-5 mb-14 flex-wrap">
        <div className="w-[320px] h-[190px] rounded-[22px] bg-gradient-to-r from-[#00C46A] to-[#00B15D] p-6 text-white shadow-md flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] opacity-80 mb-1">Current Balance</p>
              <h2 className="text-[36px] font-bold tracking-tight">$4,570,80</h2>
            </div>
            <h3 className="font-black text-[24px] tracking-wide">VISA</h3>
          </div>
          <div>
            <p className="text-[24px] tracking-[3px] mb-4">5294 2436 4780 2468</p>
            <div className="flex justify-between">
              <div>
                <p className="text-[10px] uppercase opacity-70">Name</p>
                <h4 className="text-[14px] font-semibold">Itai Bracha</h4>
              </div>
              <div>
                <p className="text-[10px] uppercase opacity-70">Valid Thru</p>
                <h4 className="text-[14px] font-semibold">12/24</h4>
              </div>
              <div>
                <p className="text-[10px] uppercase opacity-70">CVV</p>
                <h4 className="text-[14px] font-semibold">344</h4>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() =>
            setModal({
              open: true,
              mode: "add",
              user: null,
            })
          }
          className="w-[320px] h-[190px] rounded-[22px] border-2 border-dashed border-[#BFC4CC] flex flex-col items-center justify-center cursor-pointer hover:bg-white transition"
        >
          <div className="w-11 h-11 rounded-full border border-[#A0A7B1] flex items-center justify-center mb-3">
            <Plus size={20} className="text-[#7D8592]" />
          </div>
          <p className="text-[#6F767E] font-medium">Add new Card</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[34px] font-bold text-[#1A1D1F]">Transactions</h1>
       
      </div>

      <div className="flex items-center gap-4 mb-7 flex-wrap">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9FA5]"
          />
          <input
            type="text"
            placeholder="Search for...."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[260px] h-[46px] rounded-xl border border-[#E6E8EC] bg-white pl-11 pr-4 text-sm outline-none"
          />
        </div>
      
        
        <div >
            <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="h-[46px] px-5 pr-10 rounded-xl border border-[#E6E8EC] bg-white text-sm text-[#353945] outline-none appearance-none cursor-pointer hover:border-gray-400 transition"
  >
    <option value="All">All Status</option>
    <option value="Done">Done</option>
    <option value="Pending">Pending</option>
    <option value="Cancelled">Cancelled</option>
  </select>

        </div>
      
      </div>

      <div className="bg-white rounded-[28px] overflow-hidden border border-[#EFEFEF]">
        <table className="w-full">
          <thead className="bg-[#FCFCFD] border-b border-[#F0F0F0]">
            <tr className="text-left text-[#777E90] text-[13px]">
              <th className="py-5 pl-10 font-medium">Name</th>
              <th className="py-5 font-medium">Card</th>
              <th className="py-5 font-medium">Assigned to</th>
              <th className="py-5 font-medium">Last Transaction</th>
              <th className="py-5 font-medium">Status</th>
              <th className="py-5 font-medium">End date</th>
              <th className="py-5 font-medium">Total Used</th>
              <th className="py-5"></th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((u) => (
              <tr
                key={u.id}
                className="border-b border-[#F4F5F6] hover:bg-[#FAFAFA] transition"
              >
                <td className="py-6 pl-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#F4F5F6] flex items-center justify-center font-bold text-[#353945]">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A1D1F]">{u.name}</h3>
                      <p className="text-[12px] text-[#9A9FA5] mt-1">{u.url}</p>
                    </div>
                  </div>
                </td>

                <td className="py-6">
                  <h4 className="font-semibold text-[#1A1D1F]">Visa</h4>
                  <p className="text-[12px] text-[#777E90] mt-1">
                    **** {u.fullCardNumber?.slice(-4) || "2468"}
                  </p>
                </td>

                <td className="py-6">
                  <h4 className="font-semibold text-[#1A1D1F]">{u.assigned}</h4>
                  <p className="text-[12px] text-[#777E90] mt-1">{u.email}</p>
                </td>

                <td className="py-6">
                  <h4 className="font-semibold text-[#1A1D1F]">Jan 2, 2022</h4>
                  <p className="text-[12px] text-[#777E90] mt-1">$783.22</p>
                </td>

                <td className="py-6">
                  <div
                    className={`flex items-center gap-2 text-sm font-medium ${
                      u.status === "Done" ? "text-[#00C46A]" : "text-[#FF8A34]"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        u.status === "Done" ? "border-[#00C46A]" : "border-[#FF8A34]"
                      }`}
                    />
                    {u.status}
                  </div>
                </td>

                <td className="py-6 text-[#353945] font-medium">Jan 12, 2022</td>

                <td className="py-6 font-bold text-[#1A1D1F] text-[18px]">
                  ${u.amount}
                </td>

                <td className="py-6 pr-8 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition outline-none">
                        <MoreVertical size={20} className="text-[#777E90]" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white shadow-xl rounded-xl border border-[#E6E8EC] p-1">
                   <DropdownMenuItem 
  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg text-[14px] text-[#1A1D1F]"
  onClick={() => setModal({ open: true, mode: "view", user: u })} 
>
  <UserCircle size={18} className="text-[#777E90]" />
  View profile
</DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg text-[14px] text-[#1A1D1F]"
                        onClick={() => setModal({ open: true, mode: "edit", user: u })}
                      >
                        <Pencil size={18} className="text-[#777E90]" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1 bg-[#F4F5F6]" />
                      <DropdownMenuItem 
                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-red-50 text-[#FF6A55] rounded-lg text-[14px]"
                        onClick={() => {
                          if(window.confirm("Are you sure you want to delete this?")) {
                            deleteUser(u.id);
                          }
                        }}
                      >
                        <Trash2 size={18} className="text-[#FF6A55]" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

 <UserModal
  isOpen={modal.open}
  onClose={() =>
    setModal({
      open: false,
      mode: "add",
      user: null,
    })
  }
  mode={modal.mode}
  selectedUser={modal.user}
/>
    </div>
  );
};
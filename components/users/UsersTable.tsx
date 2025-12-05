"use client";

import Image from "next/image";
import { UserType } from "@/types/user";
import { Pencil, Trash2 } from "lucide-react";
import { mockUsers } from "./mockUsers"

export default function UsersTable({ users = mockUsers }: { users?: UserType[] }) {

   
  return (
<div className="w-full flex flex-col gap-6">
{/* Header */}
<div className="w-full relative">
<p className="text-3xl font-bold text-[#111618]">User Management</p>
<p className="text-base text-[#617c89]">Manage collaborators, roles, and permissions.</p>


<button className="absolute right-0 top-0 flex items-center gap-2 bg-[#1152d4] text-white px-4 py-2 rounded-lg">
<span className="text-lg font-medium">+</span>
<span className="text-sm font-medium">Invite Member</span>
</button>
</div>


{/* Table */}
<table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
<thead className="bg-gray-100 text-left text-sm text-gray-600">
<tr>
<th className="p-4">User</th>
<th className="p-4">Email</th>
<th className="p-4">Role</th>
<th className="p-4">Status</th>
<th className="p-4">Created</th>
<th className="p-4 text-center">Actions</th>
</tr>
</thead>


<tbody className="text-sm">
{users.map((user) => (
<tr key={user.id} className="border-b hover:bg-gray-50 transition">
<td className="p-4 flex items-center gap-3">
<img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
<span className="font-medium text-[#111618]">{user.name}</span>
</td>


<td className="p-4 text-gray-700">{user.email}</td>
<td className="p-4 capitalize text-gray-700">{user.role}</td>


<td className="p-4">
<span
className={`px-3 py-1 rounded-full text-xs font-semibold
${user.status === 'active' ? 'bg-green-200 text-green-800' : ''}
${user.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : ''}
${user.status === 'inactive' ? 'bg-red-200 text-red-800' : ''}`}
>
{user.status}
</span>
</td>


<td className="p-4 text-gray-700">{user.createdAt}</td>


<td className="p-4 flex justify-center gap-4">
<button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
<Pencil size={16} />
</button>
<button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
<Trash2 size={16} />
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
  );
}

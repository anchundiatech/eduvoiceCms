import UsersTable from "@/components/users/UsersTable";
import { EmptyUsers } from "@/components/dashboard/EmptyUsers";
import  { mockUsers } from "@/components/users/mockUsers";

export default async function UsersPage() {
  // const res = await fetch(`${process.env.API_URL}/users`);
  // const users = await res.json();


  const users = mockUsers; // mock mientras llega el backend

  return (
   <div className="w-full">
      {/* HEADER de la pantalla */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">User Management</h1>
        
         <a
          href="/dashboard/usuarios/nuevo"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Agregar usuario
        </a>
      </div>

           {users.length === 0 ? (
        <EmptyUsers />
      ) : (
    <UsersTable users={users} />
      )}


  
    </div>
  );
}

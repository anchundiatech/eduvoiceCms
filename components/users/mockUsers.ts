import { UserType } from "@/types/user";

export const mockUsers: UserType[] = [
  {
    id: "1",
    name: "Ana López",
    email: "ana@example.com",
    role: "admin",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=1",
    createdAt: "2024-11-01",
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    role: "editor",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?img=2",
    createdAt: "2024-11-03",
  },
  {
    id: "3",
    name: "Lucía Fernández",
    email: "lucia@example.com",
    role: "editor",
    status: "inactive",
    avatar: "https://i.pravatar.cc/150?img=3",
    createdAt: "2024-11-05",
  },
  {
    id: "4",
    name: "José Martínez",
    email: "jose@example.com",
    role: "admin",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=4",
    createdAt: "2024-11-06",
  },
];

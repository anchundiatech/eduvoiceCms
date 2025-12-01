export interface UserType {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  status: 'active' | 'pending' | 'inactive';
  avatar?: string;
  createdAt: string;
}

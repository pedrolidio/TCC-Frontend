'use client';

import { User } from '../types';
import UserTable from './UserTable';

interface UserListClientProps {
  users: User[];
}

export default function UserListClient({ users }: UserListClientProps) {
  
  const handleRoleChange = (userId: number) => {
    console.log(`Solicitada alteração de role para usuário ${userId}`);
    // A implementar futuramente
  };

  const handlePasswordChange = (userId: number) => {
    console.log(`Solicitada alteração de senha para usuário ${userId}`);
    // A implementar futuramente
  };

  return (
    <UserTable 
      users={users} 
      onChangeRole={handleRoleChange}
      onChangePassword={handlePasswordChange}
    />
  );
}
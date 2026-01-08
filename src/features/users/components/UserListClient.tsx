'use client';

import { useState } from 'react';
import { User } from '../types';
import UserTable from './UserTable';
import ChangeRoleModal from './ChangeRoleModal';
import ChangePasswordModal from './ChangePasswordModal';

interface UserListClientProps {
  users: User[];
}

export default function UserListClient({ users }: UserListClientProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleRoleChange = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsRoleModalOpen(true);
    }
  };

  const handlePasswordChange = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsPasswordModalOpen(true);
    }
  };

  const closeModals = () => {
    setIsRoleModalOpen(false);
    setIsPasswordModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <UserTable 
        users={users} 
        onChangeRole={handleRoleChange}
        onChangePassword={handlePasswordChange}
      />

      {isRoleModalOpen && selectedUser && (
        <ChangeRoleModal 
          isOpen={isRoleModalOpen}
          onClose={closeModals}
          userId={selectedUser.id}
          username={selectedUser.username}
          currentRoleId={selectedUser.role_id}
        />
      )}

      {isPasswordModalOpen && selectedUser && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={closeModals}
          userId={selectedUser.id}
          username={selectedUser.username}
        />
      )}
    </>
  );
}
'use client';

import { logoutAction } from '../actions/logoutAction';

export default function LogoutButton() {
  return (
    <button
      onClick={() => logoutAction()}
      className="cursor-pointer rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 transition-colors"
    >
      Logout
    </button>
  );
}
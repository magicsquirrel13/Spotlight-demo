import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/spotlight-admin/Sidebar';
import { Topbar } from '../../components/spotlight-admin/Topbar';
export function SpotlightAdminShell() {
  return (
    <div className="flex min-h-screen bg-[var(--bg-page)]">
      <Sidebar />
      <div className="flex-1 ml-[220px] flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-[24px_32px_40px]">
          <Outlet />
        </main>
      </div>
    </div>);

}
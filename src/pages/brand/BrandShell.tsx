import React from 'react';
import { Outlet } from 'react-router-dom';
import { BrandSidebar } from '../../components/brand/BrandSidebar';
import { BrandTopbar } from '../../components/brand/BrandTopbar';
export function BrandShell() {
  return (
    <div className="flex min-h-screen bg-[var(--bg-page)]">
      <BrandSidebar />
      <div className="flex-1 ml-[220px] flex flex-col min-w-0">
        <BrandTopbar />
        <main className="flex-1 p-[24px_32px_40px]">
          <Outlet />
        </main>
      </div>
    </div>);

}
import React, { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { PartnerSidebar } from '../../components/partner/PartnerSidebar';
import { PartnerTopbar } from '../../components/partner/PartnerTopbar';
interface PartnerLocationContextType {
  selectedLocation: string;
  setSelectedLocation: (id: string) => void;
}
const PartnerLocationContext = createContext<PartnerLocationContextType>({
  selectedLocation: 'all',
  setSelectedLocation: () => {}
});
export const usePartnerLocation = () => useContext(PartnerLocationContext);
export function PartnerShell() {
  const [selectedLocation, setSelectedLocation] = useState('all');
  return (
    <PartnerLocationContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation
      }}>
      
      <div className="flex min-h-screen bg-[var(--bg-page)]">
        <PartnerSidebar />
        <div className="flex-1 ml-[220px] flex flex-col min-w-0">
          <PartnerTopbar />
          <main className="flex-1 p-[24px_32px_40px]">
            <Outlet />
          </main>
        </div>
      </div>
    </PartnerLocationContext.Provider>);

}
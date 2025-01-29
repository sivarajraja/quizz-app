import React from 'react'
import Sidebar from './Sidebar'

const ParentComponent = ({children}) => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto snap-y snap-mandatory scrollbar-hide scroll-smooth pt-[your-sidebar-height]">
        {children}
      </div>
    </div>
  );
}

export default ParentComponent;

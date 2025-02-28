
import React from "react";

const EDTLogo: React.FC = () => (
  <div className="flex justify-center my-4">
    <img 
      src="/lovable-uploads/a226cbc0-4e6a-460c-ad7b-f331433c855a.png" 
      alt="EDT Center Logo" 
      className="edt-logo w-auto h-auto shadow-sm rounded"
      style={{ 
        backgroundColor: 'transparent',
        maxWidth: '300px', // Increased from 240px
        minHeight: '80px'  // Ensure logo has minimum height for visibility
      }}
    />
  </div>
);

export default EDTLogo;


import React from "react";

const EDTLogo: React.FC = () => (
  <div className="flex justify-center my-4">
    <img 
      src="/lovable-uploads/b2e53dfa-7aea-42a6-a882-9756b8818966.png" 
      alt="EDT Center Logo" 
      className="edt-logo w-auto h-auto shadow-sm rounded"
      style={{ 
        backgroundColor: 'transparent',
        maxWidth: '350px', // Increased from 300px
        minHeight: '90px'  // Increased from 80px for better visibility
      }}
    />
  </div>
);

export default EDTLogo;

import React from "react";
const Button = React.memo(
  ({ children, onClick, className, isDisabled = false }) => {
    return (
      <button
        className={`bg-[#633CFF] py-[11px] px-[24px] rounded-[8px] font-semibold text-[16px] leading-[24px] text-center ${className}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

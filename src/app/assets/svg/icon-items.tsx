import React from "react";

export default function IconItems(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H5C3.897 3 3 3.897 3 5V19C3 20.103 3.897 21 5 21H19C20.103 21 21 20.103 21 19V5C21 3.897 20.103 3 19 3ZM11.067 16.481L7.293 12.707L8.707 11.293L10.933 13.519L15.232 8.36L16.769 9.64L11.067 16.481Z"
        fill="currentColor"
      />
    </svg>
  );
}

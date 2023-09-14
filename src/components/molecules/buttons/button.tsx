import React, { type ButtonHTMLAttributes } from 'react';

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
    <button
        {...props}
        className={`${props.className} font-semibold px-4 py-1 rounded-full shadow transition-all duration-300 hover:scale-105 active:scale-100 border rounded-full`}
    ></button>
);

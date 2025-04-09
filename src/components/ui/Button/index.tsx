import {CiSearch} from "react-icons/ci";
import React, {ButtonHTMLAttributes} from "react";
import {twMerge} from "tailwind-merge";

const Button = (props: ButtonHTMLAttributes<any>) => {
    const {onClick, children, className, ...rest} = props
    return <button
        onClick={onClick}
        className={twMerge("hover:text-blue-600", className)}
        {...rest}
    >
        {children}
    </button>
}
export default Button;
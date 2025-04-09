import React, {InputHTMLAttributes} from "react";

interface IProps {
    error?: string,
}

const Input = (props: InputHTMLAttributes<any> & IProps) => {
    const {error, ...rest} = props;
    return <input
        type="text"
        className={`bg-white flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none ${
            error ? "border-red-500" : ""
        }`}
        {...rest}
    />
}
export default Input;
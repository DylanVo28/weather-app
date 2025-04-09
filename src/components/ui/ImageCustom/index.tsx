import {ImgHTMLAttributes} from "react";

interface Props {
    src: string;
    alt?: string;
    className?: string;
}

const ImageCustom = (props: Props) => {
    return <img {...props}/>
}

export default ImageCustom;
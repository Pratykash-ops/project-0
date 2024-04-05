import React, { useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = ({src, fallbackSrc, ...rest}) => {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
};

export default ImageWithFallback;
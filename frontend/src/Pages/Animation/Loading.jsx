import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import LoaderAnimation from '../Animation/Loading_file.json'; 
import './Loading.css'

function LoadingComponent() { 
    const [showAnimation, setShowAnimation] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnimation(false);
        }, 1300);

        return () => clearTimeout(timer); 
    }, []);

    return (
        <div>
            {showAnimation && (
                <Lottie  className='loading_animation'
                    animationData={LoaderAnimation} 
                    loop={true} 
                /> 
            )}
        </div>
    );
}

export default LoadingComponent;

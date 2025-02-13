import React from 'react';

interface MulstiStepLoaderProps {
    text: string
}

 const MulstiStepLoader : React.FC<MulstiStepLoaderProps>  = ({text})=>  {
    return (
        <div className="mt-7 flex flex-col items-center ">
        <div className="typewriter">
            <div className="slide"><i></i></div>
            <div className="paper"></div>
            <div className="keyboard"></div>
        </div>
            <h1 className={`text-2xl font-bold mt-10`}>{text}</h1>
        </div>
    );
}

export default MulstiStepLoader;
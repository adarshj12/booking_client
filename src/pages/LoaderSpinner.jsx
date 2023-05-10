import React from 'react'
import { TailSpin } from 'react-loader-spinner';
const LoaderSpinner = () => {
    return (
        <div className="loading-spinner">
            <TailSpin
                height="80"
                width="80"
                color="#34dbeb"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default LoaderSpinner

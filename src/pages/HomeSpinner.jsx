import React from 'react'
import { Grid } from 'react-loader-spinner';
const LoaderSpinner = () => {
    return (
        <div className="loading-spinner">
            <Grid
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default LoaderSpinner

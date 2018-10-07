import React from 'react';
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader'

export default function LoadingIndicator() {
        return (
        <OverlayLoader
            color={'red'}
            loader="ScaleLoader" // check below for more loaders
            text="Loading... Please wait!"
            active={true}
            backgroundColor={'black'} // default is black
            opacity=".4" // default is .9
        >

            ... your component(s)
        </OverlayLoader>
    );
}
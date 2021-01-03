import React, { useState } from 'react'; 

export const isLoadingHOC = (WrappedComponent, loadingMessage) => {
  function HOC(props) {
    const [isLoading, setLoading] = useState(false);
    const setLoadingState = isComponentLoading => {
      setLoading(isComponentLoading);
    }

    return (
      <div>
        {isLoading ? <p style={{ marginTop: "100px" }}>{loadingMessage}</p> : <WrappedComponent {...props} setLoading={setLoadingState}></WrappedComponent>}
      </div>
    )
  }
  return HOC; 
}

export default isLoadingHOC; 
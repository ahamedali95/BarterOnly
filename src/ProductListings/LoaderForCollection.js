import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const LoaderForCollection = () => {
  console.log("=================");
  return (
    <div className="loader">
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    </div>
  );
}

export default LoaderForCollection;

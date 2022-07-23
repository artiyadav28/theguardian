import React, { Fragment } from 'react';
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #3582B4;
`;
const Spinner = () => {
  return (
      <Fragment>
         <PuffLoader color={"#3582B4"} loading={true} css={override} size={100} />
      </Fragment>
  );
};

export default Spinner
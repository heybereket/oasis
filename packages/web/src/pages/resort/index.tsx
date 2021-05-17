import { Container } from "@components/common/Container";
import { Navbar } from "@components/navbar/Navbar";
import React from "react";
const Resort: React.FC = () => {
  return(
      <>
      <Navbar/>
      <Container >
        <div className={`flex-col mt-20 w-full`} style={{paddingLeft: `6%`}}>
      <h2>Resorts</h2>
        </div>
      </Container>
      </>
  )
}

export default Resort;

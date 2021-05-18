import { Navbar } from "@components/navbar/Navbar";
import ResortCard from "@components/resort/ResortCard";
import React from "react";
const Resort: React.FC = () => {
  return(
      <>
      <Navbar/>
        <div className={`flex-col flex mb-14 w-full md:pl-32 pl-6`} >
          <div>
            <h2>Resorts</h2>
      <span className={`text-secondary`}>Choose a category to explore resort.</span>
        </div>
          </div>
      <div className={'grid grid-cols-1 overflow-y-auto md:grid-cols-2 gap-1 md:pl-24 pl-1'} >
          <ResortCard/>
          <ResortCard/>
          <ResortCard/>
          <ResortCard/>
          <ResortCard/>
          <ResortCard/>
          <ResortCard/>
          <ResortCard/>
          <ResortCard/>
          </div>

      </>
  )
}

export default Resort;

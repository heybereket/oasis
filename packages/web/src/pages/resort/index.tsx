import { Navbar } from "@components/navbar/Navbar";
import CategoryTab from "@components/resort/CategoryTab";
import React from "react";
const Resort: React.FC = () => {
  return(
      <>
      <Navbar/>
        <div className={`flex-col flex  w-full md:pl-32 pl-1`} >
          <div>
            <h2>Resorts</h2>
      <span className={`text-secondary`}>Choose a category to explore resort.</span>
        </div>
          </div>
      <div className={'flex overflow-visible md:pl-32 pl-1 h-3/4 w-full p-16 flex-wrap'}>
          <CategoryTab/>
          <CategoryTab/>
          <CategoryTab/>
          <CategoryTab/>
          </div>

      </>
  )
}

export default Resort;

import { Navbar } from "@components/navbar/Navbar";
import CategoryTab from "@components/resort/CategoryTab";
import React from "react";
const Resort: React.FC = () => {
  return(
      <div className="h-screen">
      <Navbar/>
        <div className={`flex-col flex mt-12 w-full md:pl-32 pl-1`} >
          <div>
            <h2>Resorts</h2>
      <span className={`text-secondary`}>Choose a category to explore resort.</span>
        </div>
          </div>
          <div className={'md:pl-32 pl-1 flex-grow-1 flex-wrap'}>
          <CategoryTab/>
          <CategoryTab/>
          </div>
      </div>
  )
}

export default Resort;

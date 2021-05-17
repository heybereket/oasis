import { Navbar } from "@components/navbar/Navbar";
import CategoryTab from "@components/resort/CategoryTab";
import React from "react";
const Resort: React.FC = () => {
  return(
      <>
      <Navbar/>

        <div className={`flex-col flex h-1/2 mt-12 w-full md:pl-32 pl-1`} >
          <div>
            <h2>Resorts</h2>
      <span className={`text-secondary`}>Choose a category to explore resort.</span>
          </div>
          <div className={`mt-16 min-h-1/2`}>
          <CategoryTab/>
          </div>
        </div>

      </>
  )
}

export default Resort;


import React from "react"
import { Link } from "react-router-dom"
import Button from "./categoryButton"

const Header = ({
    user, 
    logo, 
    searchQuery, 
    changeSearch, 
    searchQueryHandler,
    currCategory, 
    countCategories, 
    categoryHandler, 
    list,
    formSubmitHandler,
    allTools
}) => {
    return (
        <header>
        <div className="header-content">

         <Link to="/">
          <img alt={user ? user.displayName.toLowerCase() + "'s avatar" : 'CodeTribute Logo'} className="logo" src={logo}/>
         </Link>

          <br/><br/> 
          <p className="header-subtitle">Browse Open Source Projects.</p>
          <div className="search-wrapper">
            <form onSubmit={formSubmitHandler}>
                <span className="searchInputBar">
                    <input
                        className="search" 
                        type="text" 
                        autoComplete="off" 
                        spellCheck="false" 
                        placeholder="Search Projects..."
                        value={searchQuery}
                        onChange={changeSearch}
                    />
                    <button type="button" onClick={() => searchQueryHandler("")}>
                        X
                    </button>
                </span>
            </form>
           <div className="filter-wrapper">
            <Button 
            category="All" 
            count={allTools.length} 
            clickHandler={categoryHandler} />

             { Object.keys(countCategories).map(category =>
              <Button 
              currCategory={currCategory} 
              category={category} 
              count={countCategories[category]} 
              clickHandler={categoryHandler} />
            )}
           
           </div>
          </div>
        </div>
    </header>
    )
}

export default Header
import React from "react"


const Button = ({ category, count, clickHandler, currCategory }) => {
    return (
      <button
        className={`filter-button ${category === currCategory ? 'filter-active' : ''}`}
        title={category}
        onClick={() => clickHandler(category)}
      >
          {category} <span className="filter-count"> [{count}]</span>
      </button>
    )
}

export default Button
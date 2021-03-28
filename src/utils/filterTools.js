// utility functions for tools searching and filtering

/* 

for the _filterToolsByCategory_, it takes param tools and currCategory
The [tools] reference the search space i.e the array of objects from which the tools have to be filtered
The [currCategory] reference the category by which one want's to search a tool
*/

function filterToolsByCategory(tools, currCategory) {
  if (currCategory === 'All') return tools

  console.log(tools, currCategory)

  return tools.filter(tool => tool.category === currCategory)
}

/* 
for _searchTools_, it takes a searchQuery and a searchSpace
The [searchQuery] is any string by which to search the tool -> could be name, description or even category
The searchSpace param is the space(values ) from which to search the tools
*/

function searchTools(searchQuery, searchSpace) {
  const toolsBySearch = searchSpace.filter(tool =>
    (tool.name, tool.desc, tool.pricing, tool.category).includes(searchQuery.toLowerCase())
  )
  return toolsBySearch
}

export { filterToolsByCategory, searchTools }

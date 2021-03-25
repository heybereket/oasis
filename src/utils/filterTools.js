

{/* 
for the _filterToolsByCategory_, it takes param tools and currCategory
The [tools] reference the search space i.e the array of objects from which the tools have to be filtered
The [currCategory] reference the category by which one want's to search a tool

*/}


function filterToolsByCategory(tools, currCategory) {
    const toolsByCategory = currCategory === "All" 
    ? tools // return all tools if category is all
    : tools.filter(tool => tool.category === currCategory) // return tools that match the specified category
    return toolsByCategory
}

{
/* 
for _searchTools_, it takes a searchQuery and a searchSpace
The [searchQuery] is any string by which to search the tool -> could be name, description or even category
The searchSpace param is the space(values ) from which to search the tools
*/
}

function searchTools(searchQuery, searchSpace) {
    // filter? 
    const search = new RegExp(searchQuery)
    const toolsBySearch = searchSpace.filter(tool => {
    let match = ((tool.name + tool.desc + tool.price + tool.owner).toLowerCase() + searchSpace.indexOf(tool))
    let unitMatchResult = match.match(search) ? match.match(search).input : ""
    let toolNameArr = unitMatchResult.split("")
    let toolIndex = toolNameArr[toolNameArr.length - 1]
    // console.log(toolIndex)
    return unitMatchResult[0]
    })
    return toolsBySearch
}

export { filterToolsByCategory, searchTools }
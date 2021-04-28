// Modified version of stems/graphql-depth-limit

import { ValidationContext } from "graphql";

const { GraphQLError, Kind } = require("graphql");
const arrify = require("arrify");
const getDepthWrapper = (
  context: ValidationContext,
  callback = (depths) => {}
) => {
  const depth = getDepth(callback);
  return depth(context);
};

export default getDepthWrapper;

const getDepth = (callback = (depths) => {}) => (validationContext) => {
  try {
    const { definitions } = validationContext.getDocument();
    const fragments = getFragments(definitions);
    const queries = getQueriesAndMutations(definitions);
    const queryDepths = {};
    for (let name in queries) {
      queryDepths[name] = determineDepth(
        queries[name],
        fragments,
        0,
        validationContext,
        name
      );
    }
    callback(queryDepths);
    return validationContext;
  } catch (err) {
    {
      console.error(err);
      throw err;
    }
  }
};

function getFragments(definitions) {
  return definitions.reduce((map, definition) => {
    if (definition.kind === Kind.FRAGMENT_DEFINITION) {
      map[definition.name.value] = definition;
    }
    return map;
  }, {});
}

function getQueriesAndMutations(definitions) {
  return definitions.reduce((map, definition) => {
    if (definition.kind === Kind.OPERATION_DEFINITION) {
      map[definition.name ? definition.name.value : ""] = definition;
    }
    return map;
  }, {});
}

function determineDepth(node, fragments, depthSoFar, context, operationName) {
  switch (node.kind) {
    case Kind.FIELD:
      if (!node.selectionSet) {
        return 0;
      }
      return (
        1 +
        Math.max(
          ...node.selectionSet.selections.map((selection) =>
            determineDepth(
              selection,
              fragments,
              depthSoFar + 1,
              context,
              operationName
            )
          )
        )
      );
    case Kind.FRAGMENT_SPREAD:
      return determineDepth(
        fragments[node.name.value],
        fragments,
        depthSoFar,
        context,
        operationName
      );
    case Kind.INLINE_FRAGMENT:
    case Kind.FRAGMENT_DEFINITION:
    case Kind.OPERATION_DEFINITION:
      return Math.max(
        ...node.selectionSet.selections.map((selection) =>
          determineDepth(
            selection,
            fragments,
            depthSoFar,
            context,
            operationName
          )
        )
      );
    /* istanbul ignore next */
    default:
      throw new Error("uh oh! depth crawler cannot handle: " + node.kind);
  }
}

function seeIfIgnored(node, ignore) {
  for (let rule of arrify(ignore)) {
    const fieldName = node.name.value;
    switch (rule.constructor) {
      case Function:
        if (rule(fieldName)) {
          return true;
        }
        break;
      case String:
      case RegExp:
        if (fieldName.match(rule)) {
          return true;
        }
        break;
      default:
        throw new Error(`Invalid ignore option: ${rule}`);
    }
  }
  return false;
}

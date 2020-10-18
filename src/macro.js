/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */

import { addNamed } from "@babel/helper-module-imports";
import { createMacro } from "babel-plugin-macros";

export default createMacro(({ references, babel, state }) => {
  const program = state.file.path;

  for (const refName of Object.keys(references)) {
    const identifierNode = addNamed(program, refName, "redux-saga/effects", {
      nameHint: refName,
    });

    for (const refPath of references[refName]) {
      refPath.node.name = identifierNode.name;

      const parentPath = refPath.parentPath.parentPath;
      if (
        parentPath.isYieldExpression() &&
        parentPath.node.delegate === true
      ) {
        parentPath.replaceWith(
          babel.types.yieldExpression(parentPath.get("argument").node),
        );
      }
    }
  }
});

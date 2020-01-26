import { addNamed } from "@babel/helper-module-imports";
import { createMacro } from "babel-plugin-macros";

function typedReduxSagaMacro({ references, babel, state }) {
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
}

export default createMacro(typedReduxSagaMacro);

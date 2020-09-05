/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import path from "path";
import fs from "fs-extra";
import nunjucks from "nunjucks";

const OUTPUT_PATH = "./src";
const TEMPLATES_PATH = "./templates";

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader("."), {
  autoescape: false,
});

const templatePaths = fs
  .readdirSync(TEMPLATES_PATH)
  .filter((s) => s.endsWith(".njk"));

for (const templatePath of templatePaths) {
  console.log(`Rendering ${templatePath}.`);
  const res = fs.readFileSync(
    path.join(TEMPLATES_PATH, templatePath),
    "utf-8",
  );
  env.renderString(res, {});
  fs.writeFileSync(
    path.join(OUTPUT_PATH, templatePath.slice(0, -4)),
    env.renderString(res, {}),
  );
}

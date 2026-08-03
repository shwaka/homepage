// @ts-check
import tseslint from "typescript-eslint"
import { eslintConfigShwakaReact } from "@shwaka/eslint-config-shwaka"

export default tseslint.config([
  ...eslintConfigShwakaReact,
  {
    files: [
      "**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs",
      "**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts",
    ],
  },
])

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"plugin:react/recommended",
		"airbnb",
		"airbnb-typescript",
		"plugin:import/typescript",
		"plugin:tailwindcss/recommended",
		"plugin:prettier/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.json",
	},
	plugins: ["import", "react", "@typescript-eslint", "tailwindcss", "prettier"],
	rules: {
		"import/prefer-default-export": "off",

		"react/react-in-jsx-scope": "off",
		"react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
		"react/require-default-props": "off",

		"tailwindcss/no-custom-classname": "off",
	},
	ignorePatterns: ["node_modules", ".eslintrc.js", "vite.config.ts"],
};

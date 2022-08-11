import getURLFromEnv from "src/utils/getEnvURL";

const config = {
	baseUrl: getURLFromEnv(
		import.meta.env.DEV,
		"http://HOSTNAME:4001/api",
		`${window.location.origin}/api`
	),
};

export default config;

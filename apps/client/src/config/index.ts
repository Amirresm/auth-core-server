import getURLFromEnv from "src/utils/getEnvURL";

const config = {
	baseUrl: getURLFromEnv(
		import.meta.env.DEV,
		`${window.location.origin}/api`,
		import.meta.env.VITE_DEV_BASE_URL
	),
};

export default config;

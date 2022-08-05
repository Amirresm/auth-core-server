const config = {
	baseUrl: import.meta.env.PROD
		? `${window.location.origin}/api`
		: ((import.meta.env.VITE_BASE_URL as string) || "").replace(
				/HOSTNAME/,
				window.location.hostname
		  ),
};

export default config;

const config = {
	baseUrl: ((import.meta.env.VITE_BASE_URL as string) || "").replace(
		/HOSTNAME/,
		window.location.hostname
	),
};

export default config;

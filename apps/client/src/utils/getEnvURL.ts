export default function getURLFromEnv(
	mode: boolean,
	prodValue?: string,
	devValue?: string
): string {
	if (mode)
		return (
			devValue
				?.replace(/HOSTNAME/, window.location.hostname)
				?.replace(/\/$/, "") || ""
		);
	return (
		prodValue
			?.replace(/HOSTNAME/, window.location.hostname)
			?.replace(/\/$/, "") || ""
	);
}

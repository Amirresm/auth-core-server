export default function getURLFromEnv(
	mode: boolean,
	devValue?: string,
	prodValue?: string
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

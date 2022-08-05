export default function redirectWithParams(
	redirectTo: string,
	params?: Record<string, string>
) {
	const queryParams = new URLSearchParams(redirectTo?.split("?")[1]);
	Object.entries(params || {}).forEach(([key, value]) => {
		queryParams.set(key, value);
	});
	const url = `${redirectTo?.split("?")[0]}?${queryParams.toString()}`;
	window.location.href = url;
}

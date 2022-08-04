export function addUserToLS(username: string, token: string) {
	const users = JSON.parse(localStorage.getItem("users") || "[]");
	if (users.find((user: any) => user.username === username)) {
		users.map((user: any) =>
			user.username === username ? { ...user, token } : user
		);
	} else
		localStorage.setItem(
			"users",
			JSON.stringify([...users, { username, token }])
		);
}

export function getUsersFromLS() {
	return JSON.parse(localStorage.getItem("users") || "[]") as any[];
}

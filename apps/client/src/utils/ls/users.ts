export function addUserToLS(username: string, token: string) {
	const newUser = { username, token, lastLogin: Date.now() };
	let users = JSON.parse(localStorage.getItem("users") || "[]");
	if (users.find((user: any) => user.username === username)) {
		users = users.map((user: any) =>
			user.username === username ? { ...user, ...newUser } : user
		);
	} else {
		users = [...users, newUser];
	}
	localStorage.setItem("users", JSON.stringify(users));
}

export function getUsersFromLS() {
	return JSON.parse(localStorage.getItem("users") || "[]") as any[];
}

export function updateUserLastLoginInLS(username: string) {
	let users = JSON.parse(localStorage.getItem("users") || "[]");
	users = users.map((user: any) =>
		user.username === username ? { ...user, lastLogin: Date.now() } : user
	);
	localStorage.setItem("users", JSON.stringify(users));
}
export function deleteUserFromLS(username: string) {
	let users = JSON.parse(localStorage.getItem("users") || "[]");
	users = users.filter((user: any) => user.username !== username);
	localStorage.setItem("users", JSON.stringify(users));
}

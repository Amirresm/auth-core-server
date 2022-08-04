import { AccountCircle, Logout, Password } from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	Grid,
	IconButton,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import Container from "src/components/Container";
import axios from "src/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
	addUserToLS,
	deleteUserFromLS,
	getUsersFromLS,
	updateUserLastLoginInLS,
} from "src/utils/ls/users";
import redirectWithParams from "src/utils/redirect/redirectWithParams";
import moment from "moment";

export default function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const { redirectTo } = qs.parse(location.search);

	const loginMutation = useMutation<
		any,
		AxiosError,
		{ username: string; password: string }
	>(async ({ username, password }) => {
		const { data } = await axios.post("/login", {
			username,
			password,
		});
		return data;
	});

	const verifyMutation = useMutation<
		any,
		AxiosError,
		{ verifyingToken: string }
	>(async ({ verifyingToken }) => {
		const { data } = await axios.get("/info", {
			headers: { Authorization: verifyingToken },
		});
		return data;
	});

	const loggedInUsers = getUsersFromLS();
	const [usingLoginForm, setUsingLoginForm] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [customError, setCustomError] = useState("");
	const [successData, setSuccessData] = useState<any>();
	const [token, setToken] = useState("");

	useEffect(() => {
		if (token && redirectTo && !Array.isArray(redirectTo)) {
			redirectWithParams(redirectTo, {
				token: `token: ${token}`,
			});
		}
	}, [token]);

	const handleGoToRegister = () => {
		navigate(`/register${location.search}`);
	};

	const handleLogin = async () => {
		loginMutation.mutate(
			{
				username,
				password,
			},
			{
				onSettled: () => {
					setCustomError("");
				},
				onSuccess: (data) => {
					addUserToLS(data.user?.username, data.token);
					setSuccessData(data.user);
					setTimeout(() => {
						setToken(data.token);
						if (!redirectTo) setSuccessData(undefined);
					}, 2000);
				},
			}
		);
	};

	const verifyToken =
		(verifyingToken: string, verifyingUsername: string) => async () => {
			verifyMutation.mutate(
				{ verifyingToken },
				{
					onSuccess: (data) => {
						setSuccessData(data);
						updateUserLastLoginInLS(data.username);
						setTimeout(() => {
							setToken(verifyingToken);
							if (!redirectTo) setSuccessData(undefined);
						}, 2000);
					},
					onError: () => {
						setCustomError("Please login again");
						setUsingLoginForm(true);
						setUsername(verifyingUsername);
						setPassword("");
					},
				}
			);
		};

	const renderLoggedInUsers = () =>
		loggedInUsers?.length > 0 &&
		!usingLoginForm && (
			<Grid item xs={12}>
				<List>
					{loggedInUsers.map((user) => (
						<ListItem
							key={user.username}
							secondaryAction={
								<IconButton
									onClick={() => {
										deleteUserFromLS(user.username);
									}}
								>
									<Logout />
								</IconButton>
							}
							disablePadding
						>
							<ListItemButton onClick={verifyToken(user.token, user.username)}>
								<ListItemIcon>
									<AccountCircle />
								</ListItemIcon>
								<ListItemText
									primary={user.username}
									secondary={`Last login: ${moment(user.lastLogin).fromNow()}`}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Grid>
		);

	const renderLoginForm = () =>
		(!loggedInUsers?.length || usingLoginForm) && (
			<Grid container item xs={12} spacing={2}>
				{customError || loginMutation.error ? (
					<Grid item xs={12}>
						<Typography align="center" color="error">
							{customError || (loginMutation.error?.response?.data as string)}
						</Typography>
					</Grid>
				) : null}
				<Grid item xs={12}>
					<TextField
						label="Username"
						variant="outlined"
						size="small"
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							),
						}}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Password"
						type="password"
						size="small"
						variant="outlined"
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Password />
								</InputAdornment>
							),
						}}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Grid>
				<Grid container item xs={12} spacing={2}>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							size="large"
							onClick={handleLogin}
						>
							Login
						</Button>
					</Grid>
				</Grid>
			</Grid>
		);

	const renderAdditionalActions = () => (
		<Grid container item xs={12} spacing={1}>
			{loggedInUsers?.length > 0 && (
				<Grid item xs={12}>
					<Button
						variant="text"
						color="info"
						fullWidth
						onClick={() => setUsingLoginForm((ps) => !ps)}
						size="small"
					>
						{usingLoginForm ? "use a logged in account" : "add an account"}
					</Button>
				</Grid>
			)}
			<Grid item xs={12}>
				<Button
					variant="text"
					color="info"
					fullWidth
					onClick={handleGoToRegister}
					size="small"
				>
					Create an account
				</Button>
			</Grid>
		</Grid>
	);

	const renderSuccess = () => (
		<Grid container spacing={4}>
			<Grid item xs={12}>
				<Typography variant="h2" align="center" color="green">
					Logged in as {successData?.username}
				</Typography>
			</Grid>
		</Grid>
	);

	return (
		<div className="flex h-full w-full items-center justify-center px-4">
			<Container maxWidth={400}>
				{successData ? (
					renderSuccess()
				) : (
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<Typography variant="h2" align="center">
								Login
							</Typography>
						</Grid>
						{loginMutation.isLoading || verifyMutation.isLoading ? (
							<div className="flex w-full items-center justify-center">
								<CircularProgress />
							</div>
						) : (
							<>
								{renderLoggedInUsers()}
								{renderLoginForm()}
								{renderAdditionalActions()}
							</>
						)}
					</Grid>
				)}
			</Container>
		</div>
	);
}

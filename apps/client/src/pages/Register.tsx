import { AccountCircle, Password } from "@mui/icons-material";
import {
	Button,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "src/components/Container";
import axios from "src/utils/axios";
import qs from "query-string";
import { AxiosError } from "axios";
import redirectWithParams from "src/utils/redirect/redirectWithParams";

export default function Register() {
	const navigate = useNavigate();
	const location = useLocation();

	const registerMutation = useMutation<
		any,
		AxiosError,
		{ username: string; password: string }
	>(async ({ username, password }) => {
		const { data } = await axios.post("/register", {
			username,
			password,
		});
		return data;
	});

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleGoToLogin = () => {
		navigate(`/login${location.search}`);
	};

	const handleRegister = async () => {
		const { redirectTo } = qs.parse(location.search);
		registerMutation.mutate(
			{
				username,
				password,
			},
			{
				onSuccess: (data) => {
					if (redirectTo && !Array.isArray(redirectTo)) {
						redirectWithParams(redirectTo, {
							token: data.token,
						});
					}
				},
			}
		);
	};

	return (
		<div className="flex h-full w-full items-center justify-center px-4">
			<Container maxWidth={400}>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<Typography variant="h2" align="center">
							Register
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Username"
							variant="outlined"
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
					{registerMutation.error ? (
						<Grid item xs={12}>
							<Typography align="center" color="error">
								{registerMutation.error.response?.data as string}
							</Typography>
						</Grid>
					) : null}
					<Grid container item xs={12} spacing={2}>
						<Grid item xs={12}>
							<Button
								variant="contained"
								color="primary"
								fullWidth
								size="large"
								onClick={handleRegister}
							>
								Register
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="text"
								color="info"
								fullWidth
								onClick={handleGoToLogin}
							>
								login instead
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

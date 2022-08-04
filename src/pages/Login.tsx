import { AccountCircle, Password } from "@mui/icons-material";
import {
	Button,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import Container from "src/components/Container";

export default function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const { redirect } = qs.parse(location.search);

	const [username, setUsername] = useState("");

	const handleRegister = () => {
		navigate("/register");
	};

	const handleRedirectBack = () => {
		if (redirect && !Array.isArray(redirect)) {
			const params = new URLSearchParams(redirect?.split("?")[1]);
			params.set("token", `token: ${username}`);

			const url = `${redirect?.split("?")[0]}?${params.toString()}`;
			window.location.href = url;
		}
	};

	return (
		<div className="flex h-full w-full items-center justify-center">
			<Container maxWidth={400}>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<Typography variant="h2" align="center">
							Login
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
						/>
					</Grid>
					<Grid container item xs={12} spacing={2}>
						<Grid item xs={12}>
							<Button
								variant="contained"
								color="primary"
								fullWidth
								size="large"
								onClick={handleRedirectBack}
							>
								Login
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="text"
								color="info"
								fullWidth
								onClick={handleRegister}
							>
								register instead
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

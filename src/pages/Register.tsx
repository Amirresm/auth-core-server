import { AccountCircle, Password } from "@mui/icons-material";
import {
	Button,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Container from "src/components/Container";

export default function Register() {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate("/login");
	};

	return (
		<div className="flex h-full w-full items-center justify-center">
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
							>
								Register
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="text"
								color="info"
								fullWidth
								onClick={handleLogin}
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

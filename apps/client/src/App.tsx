import { CssVarsProvider } from "@mui/joy";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootRouter from "./pages/Router";
import theme from "./utils/theme";

const queryClient = new QueryClient();

function App() {
	useEffect(() => {
		document.documentElement.style.setProperty(
			"--window-height",
			`${window.innerHeight}px`
		);
		window.addEventListener("resize", () => {
			document.documentElement.style.setProperty(
				"--window-height",
				`${window.innerHeight}px`
			);
		});
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<CssVarsProvider theme={theme}>
					<RootRouter />
				</CssVarsProvider>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;

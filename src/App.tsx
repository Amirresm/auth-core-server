import { CssVarsProvider } from "@mui/joy";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
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

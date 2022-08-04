import { Route, Routes } from "react-router-dom";
import AuthenticatePage from "./AuthenticatePage";

export default function RootRouter() {
	return (
		<main className="flex h-full flex-col">
			<Routes>
				<Route path="/:mode" element={<AuthenticatePage />} />
			</Routes>
		</main>
	);
}

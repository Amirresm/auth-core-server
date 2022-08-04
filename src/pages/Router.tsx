import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticatePage from "./AuthenticatePage";

export default function RootRouter() {
	return (
		<main className="flex h-full flex-col">
			<Routes>
				<Route path="/:mode" element={<AuthenticatePage />} />
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</main>
	);
}

import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function RootRouter() {
	return (
		<main className="flex h-full flex-col">
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</main>
	);
}

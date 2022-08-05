import { useParams } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function AuthenticatePage() {
	const { mode } = useParams();

	return mode?.toLowerCase() === "register" ? <Register /> : <Login />;
}

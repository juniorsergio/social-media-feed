
import { useCurrentUser } from "./hooks/useCurrentUser";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Signup } from "./components/Signup";
import { Feed } from "./components/Feed";

import { GlobalStyles } from "./styles/global";
import { Container } from "./styles/App";

export function App() {
	const { currentUser } = useCurrentUser()

	if (!currentUser) {
		return (
			<div>
				<Signup />
				<GlobalStyles />
			</div>
		)
	}

	return (
		<div>
			<Header />

			<Container>
				<Sidebar />
				<Feed />
			</Container>

			<GlobalStyles />		
		</div>
	)
}
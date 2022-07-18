
import { useCurrentUser } from "./hooks/useCurrentUser";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { UserProfileInput } from "./components/UserProfileInput";
import { Feed } from "./components/Feed";

import { GlobalStyles } from "./styles/global";
import { Container } from "./styles/App";

export function App() {
	const { currentUser } = useCurrentUser()

	if (!currentUser) {
		return (
			<div>
				<UserProfileInput
					type='signup'
					userInfo={{
						id: '',
						name: '',
						role: '',
						avatar: ''
					}}
				/>
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
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { UserProfileInput } from "./components/UserProfileInput";
import { Feed } from "./components/Feed";

import { useFeed } from "./hooks/useFeed";
import { useCurrentUser } from "./hooks/useCurrentUser";

import { GlobalStyles } from "./styles/global";
import { Container } from "./styles/App";
import { LoadingScreen } from "./components/LoadingScreen";

export function App() {
	const { currentUser, isLoadingUser } = useCurrentUser()
	const { isLoadingFeed } = useFeed()

	if (isLoadingUser || isLoadingFeed){
		return (
			<>
				<LoadingScreen />
				<GlobalStyles />
			</>
		)
	}

	return (
		<>
			{ currentUser.id ? (
				<>
					<Header />
					<Container>
						<Sidebar />
						<Feed />
					</Container>
				</>
			) : (
				<UserProfileInput
					type='signup'
					userInfo={{
						id: '',
						name: '',
						role: '',
						avatar: 'intj'
					}}
				/>
			)}
			<GlobalStyles />
		</>
	)
}
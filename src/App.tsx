import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { UserProfileInput } from "./components/UserProfileInput/UserProfileInput";
import { Feed } from "./components/Feed/Feed";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";

import { useFeed } from "./hooks/useFeed";
import { useCurrentUser } from "./hooks/useCurrentUser";

import { GlobalStyles, Container } from "./styles/global";

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
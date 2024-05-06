import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BreezeRoutes, {
	postOnboardingRoutes,
	preOnboardingRoutes,
} from "@Constants/routes.js";
import OnboardingLayout from "@Layout/onboarding.layout.jsx";
import PostOnboardingLayout from "@Layout/postOnboarding.layout";
import { ProtectedRoutes } from "@Shared/services/protectedRoutes.service";
import ChatProvider from "@Context/chatProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div>
				<Routes>
					<Route
						path={BreezeRoutes.LANDINGROUTE}
						element={<Navigate to={BreezeRoutes.LOGINROUTE} />}
					/>
					<Route
						path={BreezeRoutes.LANDINGROUTE}
						element={<OnboardingLayout />}>
						{Object.entries(preOnboardingRoutes)?.map(([path, component]) => {
							return <Route exact key={path} element={component} path={path} />;
						})}
					</Route>
					<Route
						path={BreezeRoutes.LANDINGROUTE}
						element={<ProtectedRoutes Component={PostOnboardingLayout} />}>
						{Object.entries(postOnboardingRoutes)?.map(([path, component]) => (
							<Route exact key={path} element={component} path={path} />
						))}
					</Route>
				</Routes>
			</div>
		</QueryClientProvider>
	);
};
ReactDOM.render(
	<BrowserRouter>
		<ChatProvider>
			<App />
		</ChatProvider>
	</BrowserRouter>,
	document.getElementById("app")
);

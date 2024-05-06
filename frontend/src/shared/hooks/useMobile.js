import { useState, useEffect } from "react";

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		function handleResize() {
			// Check if the viewport width is less than a certain threshold (e.g., 768px for typical mobile devices)
			const isMobileView = window.innerWidth <= 1000;
			setIsMobile(isMobileView);
		}

		// Initial check on component mount
		handleResize();

		// Attach event listener to window resize events
		window.addEventListener("resize", handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return isMobile;
}

export default useIsMobile;

import { useCallback, useEffect, useState } from "react";

const useAvatarColorGenerator = (
	name = "John Doe",
	saturation = 100,
	lightness = 80
) => {
	const [hexColor, setHexColor] = useState("");
	const [textColor, setTextColor] = useState("");
	/** needed in case of hsl  */
	const stringToHslColor = (str, s, l) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}

		const h = hash % 360;
		return `hsl(${h}, ${s}%, ${l}%)`;
	};

	const stringToHexColor = (str) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}

		const color = (hash & 0x00ffffff).toString(16);
		return `#${"00000".substring(0, 6 - color.length) + color}`;
	};
	const isColorDark = (color) => {
		const hex = color.replace("#", "");
		const r = parseInt(hex.substr(0, 2), 16);
		const g = parseInt(hex.substr(2, 2), 16);
		const b = parseInt(hex.substr(4, 2), 16);
		const brightness = (r * 299 + g * 587 + b * 114) / 1000;
		return brightness < 128;
	};
	const updateColor = useCallback(() => {
		const hexColor = stringToHexColor(name);
		const isDark = isColorDark(hexColor);
		const textColor = isDark ? "#ffffff" : "#000000";
		setHexColor(hexColor);
		setTextColor(textColor);
	}, [name]);

	useEffect(() => {
		updateColor();
	}, [updateColor]);

	return [hexColor, textColor];
};

export default useAvatarColorGenerator;

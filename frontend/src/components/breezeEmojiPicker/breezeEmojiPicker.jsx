import useIsMobile from "@Shared/hooks/useMobile";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

const BreezeEmojiPicker = ({ setMessage, msgBoxRef }) => {
	const isMobile = useIsMobile();
	const handleEmojiPicker = (emojiData) => {
		// e?.preventDefault();
		const { emoji } = emojiData;

		// Get the current selection
		const selection = window.getSelection();

		if (selection.rangeCount > 0) {
			// Get the first range
			const range = selection.getRangeAt(0);

			// Create a new text node with the emoji

			const emojiNode = document.createTextNode(emoji);

			// Insert the emoji at the cursor position
			range.deleteContents();

			range.insertNode(emojiNode);

			// Move the cursor after the inserted emoji
			range.setStartAfter(emojiNode);
			range.collapse(true);

			// Clear the selection
			selection.removeAllRanges();

			// Set the updated range as the selection
			selection.addRange(range);

			// Focus on the content-editable div
			msgBoxRef.current.focus();

			// Trigger the input event to update React's state
			const event = new Event("input", { bubbles: true });
			msgBoxRef.current.dispatchEvent(event);
		}
		// Optionally, you can also update the message state if needed
		setMessage(msgBoxRef.current.textContent);
	};

	return (
		<div>
			<EmojiPicker
				lazyLoadEmojis={true}
				searchDisabled={true}
				width={"100%"}
				height={`${isMobile ? "300px" : "300px"} `}
				onEmojiClick={handleEmojiPicker}
				emojiStyle={EmojiStyle.APPLE}
			/>
		</div>
	);
};

export default BreezeEmojiPicker;

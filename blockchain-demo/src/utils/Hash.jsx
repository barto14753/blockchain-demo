import sha256 from "crypto-js/sha256";

export const hash = (block) => {
	return sha256(
		block.nonce + block.id + block.created + block.data + block.prev
	).toString();
};

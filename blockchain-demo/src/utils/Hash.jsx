import sha256 from "crypto-js/sha256";

const MINE_DIFFICULTY = 4;
const SEARCH_DEPTH = 10000000;

export const hash = (block) => {
	return sha256(
		block.nonce + block.id + block.created + block.data + block.prev
	);
};

export const mine = (block) =>
	[...Array(SEARCH_DEPTH).keys()]
		.map((nonce) => sha256(nonce + block.id + block.created + block.prev))
		.find((h) => h.slice(MINE_DIFFICULTY) === MINE_DIFFICULTY * "0");

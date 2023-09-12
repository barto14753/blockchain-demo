import sha256 from "crypto-js/sha256";
import { hash } from "./Hash";

const MINE_DIFFICULTY = 2;
const SEARCH_DEPTH = 10000;

export const mine = (block) => {
	let nonce;
	for (nonce = 0; nonce < SEARCH_DEPTH; nonce++) {
		const hash = sha256(
			nonce + block.id + block.created + block.data + block.prev
		).toString();
		if (hash.slice(-MINE_DIFFICULTY) === "0".repeat(MINE_DIFFICULTY)) {
			break;
		}
	}
	block.nonce = nonce;
	block.hash = hash(block);
	return block;
};

export const newBlock = (prevBlock, data) => {
	const block = {
		id: prevBlock.id + 1,
		nonce: 0,
		created: Date.now(),
		data: data,
		prev: prevBlock.hash,
	};
	return mine(block);
};

export const isValid = (block) => {
	return hash(block).slice(-MINE_DIFFICULTY) === "0".repeat(MINE_DIFFICULTY);
};

export const createRootBlock = () => {
	const block = {
		id: 0,
		created: Date.now(),
		data: "Sample data",
		prev: "0".repeat(64),
	};
	return mine(block);
};

export const propagateHashChange = (blockId, blocks) => {
	const block = blocks[blockId];
	block.created = Date.now();
	blocks[blockId].hash = hash(block);
	if (blockId + 1 < blocks.length) {
		blocks[blockId + 1].prev = block.hash;
		return propagateHashChange(blockId + 1, blocks);
	}
	return blocks;
};

import sha256 from "crypto-js/sha256";
import { hash } from "./Hash";

export function calculateHash(data, prev, nonce) {
	return sha256(data + prev + nonce).toString();
}

export function mine(block, difficulty = 1) {
	let hash = "";
	let nonce = 0;
	const target = "0".repeat(difficulty);

	while (!hash.startsWith(target)) {
		nonce++;
		hash = calculateHash(block.data, block.prev, nonce);
	}

	return {
		...block,
		nonce,
		hash,
	};
}

export function* mineGenerator(block, difficulty = 1) {
	let hash = "";
	let nonce = 0;
	const target = "0".repeat(difficulty);
	const BATCH_SIZE = 2500; // liczba prób na iterację

	while (!hash.startsWith(target)) {
		for (let i = 0; i < BATCH_SIZE; i++) {
			nonce++;
			hash = calculateHash(block.data, block.prev, nonce);
			if (hash.startsWith(target)) break;
		}
		yield { nonce, hash, finished: hash.startsWith(target) };
	}

	return {
		...block,
		nonce,
		hash,
	};
}

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

export const isValid = (block, difficulty) => {
	const target = "0".repeat(difficulty);
	return block.hash.startsWith(target);
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

export const propagateHashChange = (blockId, blocks, isFirst = false) => {
	const block = blocks[blockId];

	if (!isFirst) {
		block.created = Date.now();
		blocks[blockId].hash = hash(block);
	}
	if (blockId + 1 < blocks.length) {
		blocks[blockId + 1].prev = block.hash;
		return propagateHashChange(blockId + 1, blocks);
	}
	return blocks;
};

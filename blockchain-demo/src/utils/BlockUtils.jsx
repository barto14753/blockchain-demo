import sha256 from "crypto-js/sha256";
import { hash } from "./Hash";

const MINE_DIFFICULTY = 1;
const SEARCH_DEPTH = 100000;


export const mine = (block) => {
	const nonce = [...Array(SEARCH_DEPTH).keys()]
		.map(nonce => sha256(nonce + block.id + block.created + block.prev))
		.find(h => {
            console.log(h)
            return h.slice(MINE_DIFFICULTY) === MINE_DIFFICULTY * "0"
        });
    block.nonce = nonce
    block.hash = hash(block)
    return block
}

export const newBlock = (prevBlock, data) => {
    const block = {
        id: prevBlock.id + 1,
        nonce: 0,
        created: Date.now(),
        data: data,
        prev: prevBlock.hash
    }
    return mine(block)
}

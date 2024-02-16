const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {

  const merkleTree = new MerkleTree(niceList);

  // Get your name from somewhere, for example:
  const myName = "Jay Sojitra";

  // Generate a proof that you're on the nice list
  const index = niceList.indexOf(myName);
  const proof = merkleTree.getProof(index);

  // Request the gift from the server along with the proof
  try {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name: myName,
      proof: proof
    });
    console.log({ gift });
  } catch (error) {
    console.error("Error requesting gift:", error.message);
  }
}

main();

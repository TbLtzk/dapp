import VotingService from "api/contracts/Voting/VotingService";

export default class ParametersVoting extends VotingService {

    /**
     * create proposal
     * @param data
     * @param userAddress
     * @return string
     */
    async createProposal(data, userAddress) {
        console.log("DATA ParametersVoting", data);
        let result = null;
        const link = data["external-link"];
        const typeValueProposal = data["type-value-proposal"];
        const key = data.key;
        let valueInput = data.value;
        // candidate = "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7"; //usual account 1
        switch (typeValueProposal) {
            case "address":
                valueInput = "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7";
                result = await this.contract.methods.createAddrProposal(link, key, valueInput).send(
                    {from: userAddress});
                break;
            case "boolean":
                valueInput = (valueInput === 'true');
                console.log("boolean", valueInput);
                result = await this.contract.methods.createBoolProposal(link, key, valueInput).send(
                    {from: userAddress});
                break;
            case "string":
                result = await this.contract.methods.createStrProposal(link, key, valueInput).send(
                    {from: userAddress});
                break;
            case "bytes":
                valueInput = this.drizzle.web3.utils.fromAscii(valueInput);
                console.log("bytes", valueInput);
                result = await this.contract.methods.createBytesProposal(link, key, valueInput).send(
                    {from: userAddress});
                break;
            case "uint":
                valueInput = Number(valueInput);
                result = await this.contract.methods.createUintProposal(link, key, valueInput).send(
                    {from: userAddress});
                break;
            case "asset-uint":
                valueInput = Number(valueInput);
                result = await this.contract.methods.createAssetUintProposal(link, key, valueInput, 'QBTC:QUSD').send(
                    {from: userAddress});
                break;
            default:
                return null;
        }
        return result;
    }
}

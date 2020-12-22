import VotingService from "api/contracts/Voting/VotingService";

export default class MembershipVoting extends VotingService {

    /**
     * create proposal
     * @param data
     * @param userAddress
     * @return string
     */
    async createProposal(data, userAddress) {
        console.log("DATA MembershipVoting", data);
        let result = null;
        const link = data["external-link"];
        let candidate = data["address"];
        console.log("candidate", candidate);
        candidate = "0xde4a0D41cA0AE39A3e479Cb6a029c134274b1Bde"; //usual account 1
        // candidate = "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7"; //usual account 1
        //TODO: createChangeExpertProposal
        if (data?.first === "add-a-new-expert") {
            result = await this.contract.methods.createAddExpertProposal(link, candidate).send(
                {from: userAddress});
            console.log("result", result);
        } else if (data?.first === "remove-a-current-expert") {
            candidate = "0x66316FfA38490d4d072F34EF7D7BA64Ce6b4478e"; //expert account
            result = await this.contract.methods.createRemoveExpertProposal(link, candidate).send(
                {from: userAddress});
            console.log("result", result);
        }
        return result;
    }
}

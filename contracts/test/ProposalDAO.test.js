const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("ProposalDAO Contract", function () {
    let DAO, dao, Token, token, owner, voter1, voter2;
    beforeEach(async () => {
        [owner, voter1, voter2] = await ethers.getSigners();
        // Deploy a test token to simulate voting power
        Token = await ethers.getContractFactory("TestToken");
        token = await Token.deploy();
        // Transfer tokens to voters
        await token.transfer(voter1.address, 100);
        await token.transfer(voter2.address, 200);
        // Deploy the DAO contract
        DAO = await ethers.getContractFactory("ProposalDAO");
        dao = await DAO.deploy(token.address);
    });
    it("Should create a proposal", async () => {
        await dao.createProposal("Proposal 1", "Invest in ETH staking");
        const proposal = await dao.proposals(1);
        expect(proposal.title).to.equal("Proposal 1");
    });
    it("Should allow voting and tally correctly", async () => {
        await dao.createProposal("Proposal 2", "Stake DAI");
        await token.connect(voter1).approve(dao.address, 100);
        await dao.connect(voter1).vote(1, true); // vote FOR
        const updatedProposal = await dao.proposals(1);
        expect(updatedProposal.votesFor).to.equal(100);
    });
    it("Should prevent double voting", async () => {
        await dao.createProposal("Proposal 3", "Buy BTC");
        await dao.connect(voter1).vote(1, true);
        await expect(
            dao.connect(voter1).vote(1, false)
        ).to.be.revertedWith("Already voted");
    });
    it("Should allow execution after vote ends and passed", async () => {
        await dao.createProposal("Proposal 4", "Yield farm");
        await dao.connect(voter2).vote(1, true);
        // Fast forward time to after deadline
        await ethers.provider.send("evm_increaseTime", [86401]); // 1 day + 1 sec
        await ethers.provider.send("evm_mine");
        await dao.executeProposal(1);
        const proposal = await dao.proposals(1);
        expect(proposal.executed).to.equal(true);
    });
    it("Should reject execution if not enough votes FOR", async () => {
        await dao.createProposal("Proposal 5", "Stake in risky pool");
        await dao.connect(voter2).vote(1, false); // votesAgainst
        await ethers.provider.send("evm_increaseTime", [86401]);
        await ethers.provider.send("evm_mine");
        await expect(dao.executeProposal(1)).to.be.revertedWith("Not approved");
    });
});
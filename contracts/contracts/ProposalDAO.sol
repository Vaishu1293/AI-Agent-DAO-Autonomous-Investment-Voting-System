// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract ProposalDAO {
    // Token used for voting power
    IERC20 public governanceToken;
    uint256 public proposalCount;
    // Basic structure of a proposal
    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 deadline; // timestamp until which voting is allowed
        bool executed;
    }
    // Mapping of proposal ID to Proposal
    mapping(uint256 => Proposal) public proposals;
    // Track whether an address has voted on a proposal
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    // Events for frontend/graph indexing
    event ProposalCreated(uint256 indexed id, string title, uint256 deadline);
    event VoteCast(uint256 indexed proposalId, address voter, bool support);
    event ProposalExecuted(uint256 indexed id);

    constructor(address _tokenAddress) {
        governanceToken = IERC20(_tokenAddress);
    }

    /// @notice Create a new proposal (AI backend or admin calls this)
    function createProposal(
        string calldata _title,
        string calldata _description
    ) external {
        proposalCount++;
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            title: _title,
            description: _description,
            votesFor: 0,
            votesAgainst: 0,
            deadline: block.timestamp + 1 days,
            executed: false
        });
        emit ProposalCreated(proposalCount, _title, block.timestamp + 1 days);
    }

    /// @notice Vote on a proposal (1 token = 1 vote)
    function vote(uint256 _proposalId, bool support) external {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp < proposal.deadline, "Voting period ended");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");
        uint256 voterPower = governanceToken.balanceOf(msg.sender);
        require(voterPower > 0, "No voting power");
        if (support) {
            proposal.votesFor += voterPower;
        } else {
            proposal.votesAgainst += voterPower;
        }
        hasVoted[_proposalId][msg.sender] = true;
        emit VoteCast(_proposalId, msg.sender, support);
    }

    /// @notice Execute the proposal (manual or by Chainlink later)
    function executeProposal(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp >= proposal.deadline, "Voting still active");
        require(!proposal.executed, "Already executed");
        // Check if majority voted in favor
        require(proposal.votesFor > proposal.votesAgainst, "Not approved");
        proposal.executed = true;
        // Logic to execute can be customized here (e.g., call another contract)
        emit ProposalExecuted(_proposalId);
    }
}

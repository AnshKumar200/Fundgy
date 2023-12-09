// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.8;
import "hardhat/console.sol";
import "./PriceConvertor.sol";
error CrowdFunding__DeadLineIsAlreadyPassed();
error CrowdFunding__TransferFailed();

contract CrowdFunding {
    AggregatorV3Interface private s_priceFeed;

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountColleacted;
        string image;
        address[] donators;
        uint256[] donations;
        string category;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 private s_numberOfCampaigns = 0;

    constructor(address priceFeedAddress) {
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image,
        string memory _category
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[s_numberOfCampaigns];

        if (_deadline < block.timestamp) {
            revert CrowdFunding__DeadLineIsAlreadyPassed();
        }

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountColleacted = 0;
        campaign.image = _image;
        campaign.category = _category;

        s_numberOfCampaigns++;

        return s_numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        (bool success, ) = payable(campaign.owner).call{value: amount}("");
        if (!success || msg.value <= 0) {
            revert CrowdFunding__TransferFailed();
        } else {
            campaign.amountColleacted = campaign.amountColleacted + amount;
        }
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](s_numberOfCampaigns);
        for (uint i = 0; i < s_numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }

    function getConvertedPrice() public view returns (uint256) {
        return PriceConvertor.getPrice(s_priceFeed);
    }

    function getNumberOfCampaigns() public view returns (uint256) {
        return s_numberOfCampaigns;
    }
}

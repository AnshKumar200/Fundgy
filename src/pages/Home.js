import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { ethers } from "ethers";
import { DisplayCampaigns } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const crowdFundingAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  useEffect(() => {
    if (crowdFundingAddress) {
      fetchCampaigns();
    }
  }, [crowdFundingAddress]);

  const { runContractFunction: getCampaigns } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdFundingAddress,
    functionName: "getCampaigns",
    params: {},
  });

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const campaigns = await getCampaigns();
    const data = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountColleacted: ethers.utils.formatEther(
        campaign.amountColleacted.toString()
      ),
      image: campaign.image,
      pId: i,
      category: campaign.category,
    }));
    setCampaigns(data);
    setIsLoading(false);
  };

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;

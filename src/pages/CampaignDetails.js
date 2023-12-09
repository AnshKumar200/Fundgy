import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { calculateBarPercentage, daysLeft } from "../utils";
import { fundRaised, loader, logo, tagType } from "../assets";
import { CountBox, Loader } from "../components";
import { Bell, Button, useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { ethers } from "ethers";
import "../index.css";

const CampaignDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isToggled, setIsToggled] = useState(true);
  const onToggle = () => setIsToggled(!isToggled);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(true);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [targetm, setTargetm] = useState();
  const [convertedPrice, setConvertedPrice] = useState(0);
  const [priceinUsdChain, setPriceinUsdChain] = useState(0);
  const [errorMessageAmount, setErrorMessageAmount] = useState();
  const remainingDays = daysLeft(state.deadline);
  const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const dispatch = useNotification();
  const crowdFundingAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const { runContractFunction: getDonators } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdFundingAddress,
    functionName: "getDonators",
    params: { _id: state.pId },
  });

  const fetchDonators = async () => {
    const donations = await getDonators();
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    setDonators(parsedDonations);
  };

  useEffect(() => {
    if (crowdFundingAddress) fetchDonators();
  }, [crowdFundingAddress, account]);

  useEffect(() => {
    if (abi != undefined && crowdFundingAddress != undefined) {
      pricegeting();
    }
  }, [abi, crowdFundingAddress]);

  async function pricegeting() {
    setPriceinUsdChain((await getConvertedPrice()) / 1e18);
  }

  const { runContractFunction: donateToCampaign } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdFundingAddress,
    functionName: "donateToCampaign",
    params: { _id: state.pId },
    msgValue: targetm,
  });
  const { runContractFunction: getConvertedPrice } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdFundingAddress,
    functionName: "getConvertedPrice",
    params: {},
  });
  function toWei(number, unit) {
    const units = {
      ether: 1e18,
      finney: 1e15,
      szabo: 1e12,
      wei: 1,
    };

    if (!units[unit]) {
      throw new Error("Invalid unit");
    }

    return number * units[unit];
  }

  const handleDonate = async () => {
    if (!hasError) {
      setIsLoading(true);
      if (amount <= 0) {
        alert(`Please enter a donation amount. 💰`);
        setIsLoading(false);
      } else {
        await donateToCampaign({
          onSuccess: handleSucess,
          onError: (error) =>
            alert(`Your transaction failed.⚠️ Please try again. 🔁`),
        });

        setIsLoading(false);
      }
    }
  };
  const handleSucess = async function (tx) {
    await tx.wait(1);
    handleNewNotifications(tx);
  };
  const handleNewNotifications = function () {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: <Bell fontSize={20} />,
    });
    navigate("/");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] md:object-cover  rounded-xl"
          />
          {/* <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountColleacted
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div> */}
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d] "
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountColleacted
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
          <div className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px] mt-[5px]">
            We've raised{" "}
            {calculateBarPercentage(state.target, state.amountColleacted)}% 📈
            from our target! 🎯 Thanks to everyone who donated! 🙏
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountColleacted}
          />
          <CountBox title="Total Donaters" value={donators.length} />
        </div>
      </div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={logo}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
                <div className="flex flex-row items-center mb-[18px]">
                  <img
                    src={tagType}
                    alt="tag"
                    className="w-[17px] h-[17px] object-contain"
                  />
                  <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
                    {state.category}
                  </p>
                  {parseInt(state.amountColleacted) >=
                    parseInt(state.target) && (
                    <img
                      src={fundRaised}
                      alt="tag"
                      className="ml-[12px] mt-[2px] w-[17px] h-[17px] object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mt-[5px]">
              Amount in USD{" "}
              {
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={isToggled}
                    onChange={onToggle}
                  />
                  <span className="switch" />
                </label>
              }{" "}
              ETH
            </span>
            <div className="mt-[10px]">
              <input
                type="number"
                placeholder={`${isToggled ? `ETH 0.1` : `$ 0.1`}`}
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                min="0"
                onChange={(e) => {
                  setConvertedPrice(e.target.value * priceinUsdChain);
                  const pattern = /^[1-9]\d{0,11}$|^0\.\d{3,4}$|^0$/;

                  if (
                    e.target.value > 0 &&
                    e.target.value <= 10000 &&
                    e.target.value.length < 7
                  ) {
                    setErrorMessageAmount("");
                    setHasError(false);
                    if (!isToggled) {
                      setTargetm(
                        ethers.utils.parseEther(
                          (e.target.value / priceinUsdChain).toString()
                        )
                      );
                    } else {
                      setTargetm(ethers.utils.parseEther(e.target.value));
                    }
                  } else {
                    if (
                      e.target.value > 10000 ||
                      !pattern.test(e.target.value) ||
                      e.target.value == 0
                    ) {
                      setErrorMessageAmount(
                        "Amount must be greater✨ than 0 and less than 10000 ❗️"
                      );
                      setHasError(true);
                      setTargetm(0);
                    } else {
                      setErrorMessageAmount("");
                      setHasError(false);
                      if (!isToggled) {
                        setTargetm(
                          ethers.utils.parseEther(
                            (e.target.value / priceinUsdChain).toString()
                          )
                        );
                      } else {
                        setTargetm(ethers.utils.parseEther(e.target.value));
                      }
                    }
                  }
                  // handleFormFeildChange("target", e);

                  setAmount(e.target.value);
                  // if (e.target.value === "") {
                  //   setTargetm(0);
                  // } else {
                  //   setTargetm(ethers.utils.parseEther(e.target.value));
                  // }
                }}
              />
              {errorMessageAmount != undefined &&
                errorMessageAmount.length > 0 && (
                  <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#d56262] mb-[10px]">
                    ERROR: {errorMessageAmount}
                  </span>
                )}

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Donate because you care. Support the cause because it matters.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  We all have causes that we care about. Whether it's fighting
                  climate change, protecting animals, or helping the homeless,
                  there's something that we all believe in.
                </p>
              </div>

              <Button
                theme="primary"
                btnType="button"
                disabled={
                  remainingDays < 0 ||
                  isLoading ||
                  parseInt(state.amountColleacted) >= parseInt(state.target)
                }
                text={
                  remainingDays < 0
                    ? "The campaign is now closed 🔐"
                    : parseInt(state.amountColleacted) >= parseInt(state.target)
                    ? "Goal Met! ☑️🎉 Funding Closed!! 🏁"
                    : "Fund Campaign"
                }
                onClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CampaignDetails;

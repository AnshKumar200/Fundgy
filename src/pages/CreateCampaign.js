import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";
import { money } from "../assets";
import { Bell, Button, useNotification } from "web3uikit";
import { checkIfImage } from "../utils";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddresses, options, specialChars } from "../constants";
import { ethers } from "ethers";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(true);
  const [targetm, setTargetm] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [errorMessageGoal, setErrorMessageGoal] = useState("");
  const [errorMessageName, setErrorMessageName] = useState("");
  const [errorMessageDate, setErrorMessageDate] = useState("");
  const [errorMessageImage, setErrorMessageImage] = useState("");
  const [errorMessageCategory, setErrorMessageCategory] = useState(
    "Please select the category that you're interested in. ❗️"
  );
  let minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 7);
  let maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 27);

  const [convertedPrice, setConvertedPrice] = useState(0);
  const [priceinUsdChain, setPriceinUsdChain] = useState(0);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
    category: "",
  });
  const handleFormFeildChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const dispatch = useNotification();
  const crowdFundingAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  useEffect(() => {
    if (abi != undefined && crowdFundingAddress != undefined) {
      pricegeting();
    }
  }, [abi, crowdFundingAddress]);
  async function pricegeting() {
    setPriceinUsdChain((await getConvertedPrice()) / 1e18);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !hasError &&
      (errorMessageCategory == undefined || errorMessageCategory.length <= 0) &&
      (errorMessageDate == undefined || errorMessageDate.length <= 0) &&
      (errorMessageGoal == undefined || errorMessageGoal.length <= 0) &&
      (errorMessageImage == undefined || errorMessageImage.length <= 0) &&
      (errorMessageName == undefined || errorMessageName.length <= 0) &&
      (errorMessageDate == undefined || errorMessageDate.length <= 0)
    ) {
      setIsLoading(true);

      await createCampaign({
        onSuccess: handleSucess,
        onError: (error) =>
          alert(
            `Your transaction failed.⚠️ Please try again. 🔁 Error: ${error.message}`
          ),
      });
      setIsLoading(false);
    }
  };

  const { runContractFunction: createCampaign } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdFundingAddress,
    functionName: "createCampaign",
    params: {
      _owner: account,
      _title: form.title,
      _description: form.description,
      _target: targetm,
      _deadline: new Date(form.deadline.toString()).getTime(),
      _image: form.image,
      _category: selectedOption,
    },
  });
  const { runContractFunction: getConvertedPrice } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdFundingAddress,
    functionName: "getConvertedPrice",
    params: {},
  });

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

  const handleChangedropdown = async (event) => {
    if (selectedOption == undefined || selectedOption.length < 0) {
      setErrorMessageCategory(
        "Please select the category that you're interested in. ❗️"
      );
      setHasError(true);
    } else {
      setErrorMessageCategory("");
      setHasError(false);
    }
    await setSelectedOption(event.target.value.toString());
  };
  function getPreviousDay(date) {
    const previous = new Date(date.getTime());
    previous.setDate(previous.getDate() - 1);
    return previous;
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign 🚀
        </h1>
      </div>

      <h1 className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px] mt-[15px]">
        Note: All funds raised through this campaign will be directly
        transferred to the creator of the campaign. The creator of the campaign
        is responsible for using the funds in accordance with the campaign's
        purpose and for all applicable laws and regulations.
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            LabelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            hasValueInUSD={false}
            errorMessage={errorMessageName}
            maxLength={30}
            value={form.name}
            handleChange={(e) => {
              const pattern = /^[a-zA-Z]+( [a-zA-Z]+)*$/;

              if (!pattern.test(e.target.value)) {
                setErrorMessageName(
                  "Space in starting and end , Special characters and Numbers 🚫 are not allowed in name "
                );
                setHasError(true);
              } else {
                setErrorMessageName("");
                setHasError(false);
              }

              handleFormFeildChange("name", e);
            }}
          />
          <FormField
            LabelName="Campaign Title *"
            placeholder="write a title"
            inputType="text"
            hasValueInUSD={false}
            value={form.title}
            maxLength={60}
            handleChange={(e) => {
              handleFormFeildChange("title", e);
            }}
          />
        </div>
        <FormField
          LabelName="Story *"
          placeholder="write your Story"
          isTextArea
          value={form.description}
          hasValueInUSD={false}
          handleChange={(e) => {
            handleFormFeildChange("description", e);
          }}
        />
        <div className="w-full flex justify-center items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            LabelName="Goal *"
            placeholder="0.05 ETH"
            inputType="number"
            errorMessage={errorMessageGoal}
            value={form.target}
            hasValueInUSD={true}
            convertedPrice={convertedPrice}
            handleChange={async (e) => {
              const pattern = /^[1-9]\d{0,11}$|^0\.\d{3,4}$|^0$/;
              if (
                e.target.value > 0 &&
                e.target.value <= 10000 &&
                e.target.value.length < 7
              ) {
                setErrorMessageGoal("");
                setHasError(false);
                setTargetm(ethers.utils.parseEther(e.target.value));
              } else {
                if (
                  e.target.value > 10000 ||
                  !pattern.test(e.target.value) ||
                  e.target.value == 0
                ) {
                  setErrorMessageGoal(
                    "Goal 🎯 should be greater than 0 and less than 10,000 also digit length is must not greater than 5 "
                  );
                  setHasError(true);
                  setTargetm(0);
                } else {
                  setErrorMessageGoal("");
                  setHasError(false);
                  setTargetm(ethers.utils.parseEther(e.target.value));
                }
              }
              handleFormFeildChange("target", e);

              setConvertedPrice(e.target.value * priceinUsdChain);

              // if (e.target.value === "" || e.target.value < 0) {
              //   setTargetm(0);
              //   setErrorMessageGoal("Goal Should be greater than 0");
              // } else if (e.target.value > 10000) {
              //   setErrorMessageGoal("Goal Should be less than 10000");
              // } else if (e.target.value.length > 5) {
              //   setErrorMessageGoal(
              //     "digit of value should be 5 or less than 5 "
              //   );
              // } else {
              //   setHasError(false);
              //   setTargetm(ethers.utils.parseEther(e.target.value));
              // }
            }}
          />

          <FormField
            LabelName="End Date *"
            placeholder="End Date"
            inputType="date"
            hasValueInUSD={false}
            value={form.deadline}
            errorMessage={errorMessageDate}
            min={minDate}
            max={maxDate}
            handleChange={async (e) => {
              let value = new Date(e.target.value.toString()).getTime();
              let today = new Date();
              let twoYearsFromNow = new Date();
              twoYearsFromNow.setFullYear(today.getFullYear() + 1);

              if (value < today.getTime()) {
                setHasError(true);
                setErrorMessageDate("Date is must greater than today");
              } else if (value > twoYearsFromNow.getTime()) {
                setHasError(true);
                setErrorMessageDate("Date is not more than 1 years");
              } else {
                setHasError(false);
                setErrorMessageDate("");
              }

              handleFormFeildChange("deadline", e);
            }}
          />

          <label className="flex-1 w-full flex flex-col">
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
              Category *
            </span>
            <select
              value={selectedOption}
              onChange={handleChangedropdown}
              className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
            >
              {options.map((option) => (
                <option
                  key={option.label}
                  value={option.label}
                  className="font-epilogue font-medium text-[14px] bg-[#1c1c24] leading-[22px] text-[#808191] mb-[10px] "
                >
                  {option.label}
                </option>
              ))}
            </select>
            {errorMessageCategory != undefined &&
              errorMessageCategory.length > 0 && (
                <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#d56262] mb-[10px]">
                  ERROR: {errorMessageCategory}
                </span>
              )}
          </label>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            LabelName="Campaign Image *"
            placeholder="Place image URL of your Campaign"
            inputType="url"
            hasValueInUSD={false}
            value={form.image}
            errorMessage={errorMessageImage}
            handleChange={(e) => {
              handleFormFeildChange("image", e);
              checkIfImage(e.target.value, async (exists) => {
                if (exists) {
                  setHasError(false);
                  setErrorMessageImage("");
                } else {
                  setErrorMessageImage(
                    `The image URL you entered is not valid.⚠️ Please enter a valid image URL. 🖼️`
                  );

                  setHasError(true);
                }
              });
            }}
          />
          <div className="flex justify-center items-center mt-[40px]">
            <Button
              type="submit"
              text="Submit new Campaign"
              theme="primary"
              disabled={isLoading}
              className="h-[50px]"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;

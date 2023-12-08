import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logo, menu } from "../assets";
import { navlinks } from "../constants";
import { Button, ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";

const Navbar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isWeb3Enabled) {
      navigate("create-campaign");
    } else {
      alert("Please connect your wallet to create a campaign.");
    }
  };
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px]  rounded-[100px]">
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <ConnectButton moralisAuth={false} />
        <Button
          text="Create Campaign"
          theme="primary"
          className="h-[42px]"
          onClick={handleClick}
        />
      </div>
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                } ${!link.disabled && `cursor-pointer`}`}
                onClick={() => {
                  if (!link.disabled) {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <ConnectButton moralisAuth={false} />
            <Button
              text="Create Campaign"
              theme="primary"
              className="h-[42px]"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

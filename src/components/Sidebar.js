import React, { useState } from "react";

import { logo, sun } from "../assets";
import { navlinks } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { useMoralis } from "react-moralis";

const Sidebar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  const navigate = useNavigate();
  const { isWeb3Enabled } = useMoralis();
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled && isWeb3Enabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                } else {
                  alert("Please connect your wallet first.");
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

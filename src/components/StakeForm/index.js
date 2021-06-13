import React from "react";
import "./style.scss";

import { toast } from "react-toastify";

// ui icons
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { Button } from "@material-ui/core";

export default function StakeForm({ contract, tokenContract, address }) {
  const [isLocked, setIsLocked] = React.useState(false);
  const [stakedAmount, setStakedAmount] = React.useState(0);
  const [stakePeriodEndsAt, setStakePeriodStakeEndsAt] = React.useState(0);
  const [amount, setNewAmount] = React.useState("");
  const [apyModel, setApyModel] = React.useState("30");
  const [isPoolPacked, setIsPoolPacked] = React.useState(false);

  const submitStake = () => {
    if (amount < 100) return toast.error("Minimum Stake Amount is 100 AMA");
    if(amount > 250000) return toast.error('Maximum Stake Amount is 250K AMA');

    tokenContract
      .approve(
        window.tronWeb.address.fromHex(contract.address),
        (parseFloat(amount) * 1000000).toString()
      )
      .send()
      .then(() => {
        contract
          .StakeTokens(apyModel, (parseFloat(amount) * 1000000).toString())
          .send()
          .then(() => {
            setTimeout(() => {
              window.location.reload(true);
            }, 2000);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    setNewAmount("");
    setApyModel("30");
  };

  );
}

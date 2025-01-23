import React, { useState } from "react";
import Header from "./Header";
import Box from "./Box";
import Stat from "./Stat";

const Body = () => {
  const [totalPrice, setTotalPrice] = useState("");
  const [myTip, setMyTip] = useState("5");
  const [freindTip, setFreindTip] = useState("5");
  const totalTip = Math.round(((myTip + freindTip) / 2) * (totalPrice / 100));
  const totalPay = totalPrice + totalTip;
  //   console.log(totalPrice);

  const onClickReset = () => {
    setTotalPrice("");
    setMyTip("5");
    setFreindTip("5");
  };

  return (
    <>
      <Header totalPrice={totalPrice} setTotalPrice={setTotalPrice}>
        {" "}
        What was the total price{" "}
      </Header>
      <Box tip={myTip} setTip={setMyTip}>
        How did you like the service
      </Box>
      <Box tip={freindTip} setTip={setFreindTip}>
        How did your freind like the service
      </Box>
      <Stat reset={onClickReset}>
        {" "}
        <h1>
          {" "}
          Your total pay is {totalPay} and total tip is {totalTip}
        </h1>{" "}
      </Stat>
    </>
  );
};

export default Body;

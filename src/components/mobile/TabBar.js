import Link from "next/link";
import MovingDiv from "./MovingDiv";
import { applyCreate } from "@/src/api";
import { useState } from "react";

const TabBar = ({ messages }) => {
  const [_, setApplyTypeRequest] = useState("");

  const onButtonClick = (applyType) => {
    applyCreate({ applyType, onSuccess: (data) => setApplyTypeRequest(data) });
  };

  return (
    <MovingDiv
      {...{
        messages,
        callClicked: () => {
          onButtonClick(8);
        },
        wpClicked: () => {
          onButtonClick(9);
        },
      }}
    />
  );
};

export default TabBar;

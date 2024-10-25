import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import exit_modal from "@/src/icons/exit_modal.svg";

const ModalStandart = ({ dialogId, content }) => (
  <dialog id={dialogId} className="modal">
    <form
      method="dialog"
      className="bg-white modal-middle w-auto h-auto rounded-[20px] px-[10px] lg:px-[20px] py-[15px] lg:py-[25px]"
    >
      <div className="flex justify-end">
        {/* if there is a button in form, it will close the modal */}
        <button className="modal-action mt-0">
          <Image
            src={exit_modal}
            alt="exit_modal_icon"
            loading="lazy"
            unoptimized
          />
        </button>
      </div>
      {content}
    </form>
  </dialog>
);

export default ModalStandart;

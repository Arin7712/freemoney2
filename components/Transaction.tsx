"use client";

import { Check } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { toPng } from "html-to-image";
import { ChevronDown, CircleCheck } from "lucide-react";
import {
  generate12DigitCode,
  generateCharCode,
  getFormattedDateTime,
} from "@/lib/form.actions";

const Transaction = () => {
    const imgRef = useRef(null);
      const sound =
    typeof Audio !== "undefined" ? new Audio("/transaction.mp3") : null;

    const downloadImage = async () => {
      if (!imgRef.current) return;
  
      const dataUrl = await toPng(imgRef.current, { pixelRatio: 2 });
  
      const link = document.createElement("a");
      link.download = "gpay-image.png";
      link.href = dataUrl;
      link.click();
  
      sound?.play();
    };
  return (
    <div>
      <div className="flex justify-center text-background h-screen" >
        <div className="md:w-[340px] md:h-[682.66px] w-full h-full bg-[#131313] p-6 py-20 flex flex-col gap-8 items-center justify-center" ref={imgRef}>
            <div className="rounded-full w-18 h-18 flex items-center p-4 justify-center bg-[#1872e7]">
                <Check className="size-12"/>
            </div>
            <h1 className="text-[38px]">₹ 1,100.00</h1>
            <div className="flex flex-col items-center gap-1">
                <p className="text-[14px]">Paid to</p>
                <h1 className="text-[22px]">ARIN PRAKASH GAWANDE</h1>
                <p className="text-[14px]">Paytm • 9421835677@ptsbi</p>
                <p className="text-[12px]">24 November 2025, 8:00 pm</p>
            </div>
        </div>
      </div>
            <Button className="mt-4" onClick={downloadImage}>
              Download Image
            </Button>
    </div>
  );
};

export default Transaction;

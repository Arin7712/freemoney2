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
import { date } from "zod";

const Transaction = ({ data }: any) => {
  const imgRef = useRef(null);
  const sound =
    typeof Audio !== "undefined" ? new Audio("/transaction.mp3") : null;
  const upi = data.toUpi;
  const [upiApp, setUpiApp] = useState("Google Pay •");

  const downloadImage = async () => {
    if (!imgRef.current) return;

    const dataUrl = await toPng(imgRef.current, { pixelRatio: 2 });

    const link = document.createElement("a");
    link.download = "gpay-image.png";
    link.href = dataUrl;
    link.click();

    sound?.play();
  };

  const upiTransactionId = generate12DigitCode();
  const googleTransactionId = generateCharCode();
  const dateAndTime = getFormattedDateTime();

  type UpiSuffix = "apl" | "axl" | "fst";

  const UPI_MAP: Record<UpiSuffix, string> = {
    apl: "Apple Pay •",
    axl: "PhonePe •",
    fst: "PhonePe •",
  };

  function getUpiApp(upi: string): string | null {
    const suffix = upi.slice(-3) as UpiSuffix;

    if (suffix in UPI_MAP) {
      return UPI_MAP[suffix];
    }

    return null;
  }

  const appName = getUpiApp(upi);

  if (appName) {
    setUpiApp(appName);
  }

  return (
    <div>
      <div className="flex justify-center text-background h-screen">
        <div
          className="md:w-[340px] md:h-[682.66px] w-full h-full bg-[#131313] p-6 py-20 flex flex-col gap-8 items-center justify-center"
          ref={imgRef}
        >
          <div className="rounded-full w-18 h-18 flex items-center p-4 justify-center bg-[#1872e7]">
            <Check className="size-12" />
          </div>
          <h1 className="text-[38px]">₹ {data.amount}</h1>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[14px]">Paid to</p>
            <h1 className="text-[22px]">{data.name}</h1>
            <p className="text-[14px]">Google Pay • {data.toUpi}</p>
            <p className="text-[12px]">{dateAndTime}</p>
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

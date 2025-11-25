"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { toPng } from "html-to-image";
import { ChevronDown, CircleCheck } from "lucide-react";
import {
  generate12DigitCode,
  generateCharCode,
  getFormattedDateTime,
} from "@/lib/form.actions";

interface PaymentData {
  name: string;
  amount: number;
  bank: string;
  toUpi: string;
  fromName: string;
  fromUpi: string;
}

const CameraPayment: React.FC<{ data: PaymentData }> = ({ data }) => {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [preview, setPreview] = useState<string>("");

  const upi = data.toUpi;
  const [upiApp, setUpiApp] = useState("Google Pay •");

  const sound =
    typeof Audio !== "undefined" ? new Audio("/transaction.mp3") : null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setPreview(result);
      }
    };
    reader.readAsDataURL(file);
  };

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
    return UPI_MAP[suffix] || null;
  }

  const appName = getUpiApp(upi);
  if (appName && appName !== upiApp) setUpiApp(appName);

  return (
    <div className="flex flex-col items-center gap-6">

      {/* 🔵 Camera + Upload */}
      <div className="flex gap-4">
        {/* Open Camera */}
        <label className="cursor-pointer bg-blue-600 px-4 py-2 rounded-lg text-white">
          Open Camera
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>

        {/* Upload Image */}
        <label className="cursor-pointer bg-gray-700 px-4 py-2 rounded-lg text-white">
          Upload From Device
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      </div>

      {/* Preview Thumbnail */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-40 rounded-lg border border-gray-600"
        />
      )}

      {/* Payment UI */}
      <div className="flex justify-center text-background">
        <div
          className="w-[340px] bg-[#131313] p-6 h-fit py-20"
          ref={imgRef}
        >
          {/* Top */}
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="rounded-full w-12 h-12 flex items-center justify-center p-3 bg-[#00579c]">
              <h1 className="text-xl">{data.name.charAt(0)}</h1>
            </div>
            <h1 className="text-[16px]">To {data.name}</h1>
          </div>

          <div className="flex flex-col gap-4 justify-center items-center pt-4 pb-6">
            <h1 className="text-[46px]">
              <span className="text-[34px]">₹</span>
              {data.amount}
            </h1>
            <Button className="bg-[#a8c8fb] text-black text-[12px] rounded-full px-6 py-1.5 font-normal">
              Pay again
            </Button>

            <div className="gap-2 flex flex-col w-[65%]">
              <div className="flex justify-center items-center gap-2">
                <CircleCheck className="fill-[#139438] text-[#131313] size-4" />
                <p className="text-[13px]">Completed</p>
              </div>

              <hr className="border-neutral-700" />

              <div className="flex justify-center">
                <p className="text-[12px]">{dateAndTime}</p>
              </div>
            </div>
          </div>

          {/* Insert scanned image inside final PNG */}
          {preview && (
            <div className="flex justify-center py-4">
              <img
                src={preview}
                alt="Scanned"
                className="w-40 rounded-md border border-neutral-700"
              />
            </div>
          )}

          {/* Details Card */}
          <div className="border-neutral-700 border rounded-xl">
            <div className="flex items-center justify-between border-b-neutral-700 border-b p-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/sbilogo.png"
                  alt="State Bank of India Logo"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <h1 className="text-[14.6px]">{data.bank}</h1>
              </div>
              <ChevronDown className="size-4" />
            </div>

            <div className="flex flex-col gap-4 p-3">
              <div className="text-[13px] gap-2">
                <h1>UPI transaction ID</h1>
                <p className="text-neutral-400 tracking-tight">
                  {upiTransactionId}
                </p>
              </div>

              <div className="text-[13px] gap-2">
                <h1>To: {data.name}</h1>
                <p className="text-neutral-400">
                  {upiApp} {data.toUpi}
                </p>
              </div>

              <div className="text-[13px] gap-2">
                <h1>From: {data.fromName}</h1>
                <p className="text-neutral-400">Google Pay • {data.fromUpi}</p>
              </div>

              <div className="text-[13px] gap-2">
                <h1>Google transaction ID</h1>
                <p className="text-neutral-400">{googleTransactionId}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-[7px] tracking-wide">POWERED BY</p>
            <img src="/upi2.png" alt="UPI" width={54} height={54} />
          </div>
        </div>
      </div>

      <Button className="mt-4" onClick={downloadImage}>
        Download Image
      </Button>
    </div>
  );
};

export default CameraPayment;

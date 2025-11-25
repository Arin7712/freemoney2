"use client";

import React from "react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import QrScanner from "qr-scanner";
import PaymentImage from "@/components/PaymentImage";
import { Label } from "@/components/ui/label";
import { extractReceiverName, extractUpiId } from "@/lib/form.actions";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


type PaymentFormProps = {
  name: string;
  yourupiid: string;
};

const PaymentForm = ({ name, yourupiid }: PaymentFormProps) => {
  const [upiId, setUpiId] = useState("");
  const [upiLink, setUpiLink] = useState("");
  const [receiverName, setReceiverName] = useState("");

  // Accepts scanned QR code and extracts UPI ID and Receiver Name
  const handleFile = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    try {
      const decoded = await QrScanner.scanImage(url);
      setUpiLink(decoded);

      const id = extractUpiId(decoded);
      const name = extractReceiverName(decoded);
      setReceiverName(name || "Receiver Name not found");
      setUpiId(id || "UPI ID not found");

      setData((prev: any) => ({
        ...prev,
        toUpi: id || "",
        name: name || "",
      }));
    } catch {
      setUpiId("Invalid QR or could not read");
    }
  };

  // ---------------- Form Fields ---------------
  const [data, setData] = useState<any>({
    name: "",
    amount: "0",
    bank: "State Bank of India 4607",
    toUpi: "",
    fromName: `${name} (State Bank of India)`,
    fromUpi: yourupiid,
  });

  return (
    <div>
      <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 p-6 gap-8">
        {/* ---------------- FORM ---------------- */}
        <div className="flex flex-col gap-4">
          <div className="space-y-0">
            <h1 className="text-xl font-semibold mb-2">Free Money</h1>
            <p>We pay for you.</p>
          </div>
            <input
            id="scanner"
            type="file"
            accept="image/*"
            capture="environment"
            className=""
            onChange={handleFile}
          />
          {/* Upload Scanner */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="scanner" className="text-sm">
              Upload Scanner
            </Label>
            <Input
              id="scanner"
              type="file"
              accept="image/*"
              capture="environment"
              className="border border-neutral-700 rounded-md px-3 py-2"
              onChange={handleFile}
            />
            <p className="text-xs text-neutral-700">
              * This is to get the receiver&apos; UPI ID and Reciever&apos; Name
            </p>
            <p className="text-xs text-neutral-700">
              * If no scanner, enter receiver&apos; upi id and name manually
            </p>
          </div>

          {/* Each field individually */}
          <div className="flex flex-col">
            <label>Name</label>
            <Input
              placeholder="Enter receiver's name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label>Amount</label>
            <Input
              value={data.amount}
              onChange={(e) => setData({ ...data, amount: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="bank">Bank</Label>
            <Input
              id="bank"
              value={data.bank}
              onChange={(e) => setData({ ...data, bank: e.target.value })}
            />
            <p className="text-xs text-neutral-700">
              * You can change the bank name. Add a 4-digit numerical code after
              the name
            </p>
          </div>

          <div className="flex flex-col">
            <label>To UPI</label>
            <Input
              value={data.toUpi}
              onChange={(e) => setData({ ...data, toUpi: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="fromName">From Name</Label>
            <Input
              id="fromName"
              value={data.fromName}
              onChange={(e) => setData({ ...data, fromName: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label>From UPI</label>
            <Input
              value={data.fromUpi}
              onChange={(e) => setData({ ...data, fromUpi: e.target.value })}
            />
          </div>
        </div>
        <PaymentImage data={data} />
      </div>
    </div>
  );
};

export default PaymentForm;

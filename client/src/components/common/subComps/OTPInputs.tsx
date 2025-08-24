import { useState, useRef, useEffect } from "react";
import { GlassInputWrapper } from "./GlassInputWrapper";

export const OTPInput = ({
  length = 6,
  onComplete,
}: {
  length?: number;
  onComplete: (otp: string) => void;
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    const pasteArray = pasteData
      .split("")
      .filter((char) => !isNaN(Number(char)));

    if (pasteArray.length > 0) {
      const newOtp = [...otp];
      pasteArray.forEach((char, idx) => {
        if (idx < length) {
          newOtp[idx] = char;
        }
      });
      setOtp(newOtp);

      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex((val) => val === "");
      const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  useEffect(() => {
    const otpString = otp.join("");
    if (otpString.length === length) {
      onComplete(otpString);
    }
  }, [otp, length, onComplete]);

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((data, index) => (
        <GlassInputWrapper key={index}>
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-14 h-14 text-center text-xl font-semibold bg-transparent rounded-2xl focus:outline-none"
          />
        </GlassInputWrapper>
      ))}
    </div>
  );
};

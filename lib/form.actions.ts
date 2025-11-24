export   function generate12DigitCode() {
    let array = new Uint32Array(12); // 3 × 4 bytes = 12 digits range
    crypto.getRandomValues(array);
    return Array.from(array, num => (num % 10)).join(""); 
}

export function generateCharCode(){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let code = "";
    const array = new Uint8Array(14);
    crypto.getRandomValues(array);

    for(let i = 0; i<14; i++){
        code += chars[array[i] % chars.length]
    }

    return code
}

export function getFormattedDateTime() {
    const date = new Date();
  
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
  
    hours = hours % 12 || 12; // convert 0 => 12
  
    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}

export const extractUpiId = (str: string) => {
    try {
      const url = new URL(str);
      return url.searchParams.get("pa");
    } catch {
      return null;
    }
  };

export  const extractReceiverName = (str: string) => {
    try {
      const url = new URL(str);
      return url.searchParams.get("pn");
    } catch {
      return null;
    }
  };
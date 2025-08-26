import { cn } from "../lib/utils";
import Link from "next/link";
export const Logo = ({ className, uniColor }) => {
  return (
    <svg
      viewBox="180 160 160 150" // trimmed viewBox instead of 0 0 512 512
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto text-foreground", className)}
    >
      <path
        d="M 272.97 165.94 C 274.59 164.91 276.23 163.91 278.02 163.22 
           C 277.09 170.89 275.47 178.46 274.54 186.13 
           C 274.38 189.84 273.58 194.00 275.80 197.29 
           C 280.28 204.64 284.87 212.01 287.90 220.11 
           C 290.47 226.92 294.34 233.12 297.44 239.68 
           C 298.78 242.36 300.17 245.50 303.28 246.47 
           C 310.92 249.47 319.20 251.94 325.17 257.89 
           C 327.70 260.51 330.39 264.03 329.35 267.91 
           C 327.54 273.99 322.19 278.08 316.87 281.04 
           C 306.56 287.12 294.62 289.33 283.00 291.44 
           C 273.76 293.14 264.34 292.58 255.00 292.69 
           C 247.92 292.63 240.77 293.02 233.79 291.64 
           C 219.18 289.15 203.70 286.77 191.56 277.57 
           C 187.39 274.69 183.88 270.25 183.57 265.03 
           C 185.99 257.46 193.78 253.52 200.45 250.25 
           C 205.59 247.55 212.92 247.75 215.91 242.00 
           C 225.80 224.94 234.39 207.18 243.65 189.78 
           C 245.08 186.94 247.38 184.68 249.97 182.90 
           C 257.77 177.42 265.39 171.70 272.97 165.94 Z"
        fill={uniColor ? "currentColor" : "url(#logo-gradient)"}
      />
      <path
        d="M 246.63 221.76 C 250.23 214.92 252.65 207.47 256.98 201.01 
           C 261.84 207.97 264.58 216.10 268.68 223.49 
           C 273.63 234.68 279.56 245.38 284.56 256.55 
           C 285.72 259.69 288.65 262.79 288.13 266.16 
           L 287.18 266.62 C 283.17 264.94 279.60 262.39 275.85 260.22 
           C 269.86 256.68 264.70 251.83 258.44 248.74 
           C 256.53 247.71 254.63 249.20 253.03 250.11 
           C 248.38 253.12 243.82 256.29 239.04 259.08 
           C 235.03 261.43 231.38 264.46 226.97 266.07 
           C 225.14 264.39 227.44 262.00 227.97 260.16 
           C 234.75 247.63 239.96 234.35 246.63 221.76 Z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="200"
          y1="160"
          x2="200"
          y2="300"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#111111" />
          <stop offset="1" stopColor="#222222" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LogoIcon = ({ className, uniColor }) => {
  return (
    <svg
      viewBox="180 160 160 150"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-5", className)}
    >
      <path
        d="M 272.97 165.94 ... Z"
        fill={uniColor ? "currentColor" : "url(#logo-gradient)"}
      />
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="200"
          y1="160"
          x2="200"
          y2="300"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#111111" />
          <stop offset="1" stopColor="#222222" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LogoStroke = ({ className }) => {
  return (
    <svg
      className={cn("size-7 w-7", className)}
      viewBox="180 160 160 150"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path d="M 272.97 165.94 ... Z" stroke="currentColor" strokeWidth={0.8} />
    </svg>
  );
};

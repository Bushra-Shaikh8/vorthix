// src/components/Logo.jsx
import { Link } from "react-router-dom";

export default function Logo({ height = 32 }) {
  return (
    <Link to="/" className="flex items-center gap-2 no-underline">
      <img
        src="/vorthix-logo.jpeg"       // 👈 your file name here
        alt="Vorthix"
        style={{ height: `${height}px`, width: "auto" }}
        className="object-contain"
      />
      {/* optional: you can also keep the text next to logo */}
      {/* <span className="font-bold text-xl bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
        Vorthix
      </span> */}
    </Link>
  );
}

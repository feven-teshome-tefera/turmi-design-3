import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata = {
  title: "Turmi | Agricultural Finance Built Around Real Production",
  description: "Turmi connects agricultural finance, field execution, verification, market access, and repayment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}

import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata = {
  title: "Terminal Text Scroll Animation | Codegrid",
  description: "Terminal Text Scroll Animation | Codegrid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}

import "./globals.css";
import Header from "@/components/Header";
import Analytics from "@/components/Analytics";

export const metadata = {
  title: "LY CSD Elective Portal | ODD 2026-27",
  description:
    "Look up your final elective subjects and subject codes for Semester 7, LY CSD, ODD 2026-27.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf9f7",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Header />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="shell">
            Based on the GTU portal final elective entry &middot; ODD 2026-27 &middot;
            Semester 7 &middot; Computer Science &amp; Design
          </div>
        </footer>
      </body>
    </html>
  );
}

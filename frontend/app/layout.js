import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "سورتینگ هت – سامانه هوشمند اپلای دانشگاهی",
  description:
    "سورتینگ هت یک پلتفرم هوش مصنوعی است که روند اپلای به دانشگاه‌ها را ساده می‌کند. کاربران با یک بار وارد کردن اطلاعات تحصیلی، شانس پذیرش خود را در دانشگاه‌های مختلف پیش‌بینی می‌کنند و فهرست پیشنهادی بهینه دریافت می‌کنند.",
  keywords:
    "اپلای دانشگاه, پذیرش دانشگاه, هوش مصنوعی, مدیریت مدارک تحصیلی, سامانه هوشمند, SortingHat",
  authors: [{ name: "Sorting Hat Team" }],
  openGraph: {
    title: "سورتینگ هت – سامانه هوشمند اپلای دانشگاهی",
    description:
      "با سورتینگ هت، کاربران می‌توانند مدارک تحصیلی خود را یک بار آپلود کنند، شانس پذیرش در دانشگاه‌ها را پیش‌بینی کنند و اپلای خود را به صورت خودکار یا نیمه‌خودکار انجام دهند.",
    type: "website",
    url: "https://yourdomain.com",
    siteName: "Sorting Hat",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sorting Hat Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "سورتینگ هت – سامانه هوشمند اپلای دانشگاهی",
    description:
      "با سورتینگ هت، کاربران می‌توانند مدارک تحصیلی خود را یک بار آپلود کنند، شانس پذیرش در دانشگاه‌ها را پیش‌بینی کنند و اپلای خود را به صورت خودکار یا نیمه‌خودکار انجام دهند.",
    images: ["https://yourdomain.com/og-image.png"],
    site: "@your_twitter_handle",
    creator: "@your_twitter_handle",
  },
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl" lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader color="#fca45c" showSpinner={false}></NextTopLoader>
        {children}
      </body>
    </html>
  );
}

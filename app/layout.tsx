import ReactQueryProvider from "./providers/ReactQueryProvider";
import { Toaster } from "sonner";
import "./globals.css";
import LayoutWrapper from "./_components/LayoutWrapper/LayoutWrapper";
import { Tajawal } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});
export const metadata = {
  title: {
    default: "Gold Store | دهبنا",
    template: "%s | Gold Store",
  },

  description:
    "Gold Store — متجر متخصص في بيع الذهب الفاخر. خواتم، سبايك، سبائك، عملات، تصميمات مميزة مع توصيل سريع وضمان كامل على جميع القطع.",

  keywords: [
    "ذهب",
    "شراء ذهب",
    "متجر ذهب",
    "سبائك ذهب",
    "خواتم ذهب",
    "Gold Shop",
    "Gold Store",
    "مجوهرات",
    "بيع ذهب أونلاين",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        <ReactQueryProvider>
          <AuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AuthProvider>
          <Toaster richColors />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "sonner";
import AddCustomerForm from "@/components/admin/form/add-customer";
import AddProductForm from "@/components/admin/form/add-product";
import AddOrderForm from "@/components/admin/form/add-order";
import AddInvoiceForm from "@/components/admin/form/add-sales";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Toaster richColors position="bottom-center" />
          {children}
          {/* <AddCustomerForm />
          <AddProductForm /> */}
          {/* <AddInvoiceForm /> */}
          {/* <AddOrderForm /> */}
        </TRPCReactProvider>
      </body>
    </html>
  );
}

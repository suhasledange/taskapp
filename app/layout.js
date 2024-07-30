import { Inter } from "next/font/google";
import "./globals.css";
import { TodoProvider } from "@/context/TodoProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Manager",
  description: "Manage Your Daily Tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <TodoProvider>
        {children}
        
        </TodoProvider>
        
        </body>
    </html>
  );
}

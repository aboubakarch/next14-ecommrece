import Navbar from "@/components/Navbar";
import { AppContextProvider } from "@/context/provider";




export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (

        <div className="w-full flex flex-col items-start justify-start">
            <AppContextProvider>
                <Navbar />
                {children}
            </AppContextProvider>
        </div>

    );
}

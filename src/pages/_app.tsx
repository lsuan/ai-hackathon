import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { Inter } from "next/font/google";

import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default api.withTRPC(MyApp);

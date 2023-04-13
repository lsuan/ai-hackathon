import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Button from "~/components/ui/Button";

import { api } from "~/utils/api";

const metrics = {
  last28days: {
    revenue: 4000,
    installs: 100,
  },
  current: {
    revenue: 4500,
    installs: 300,
  },
};

type SocialMedia = "Twitter" | "LinkedIn";
const Home: NextPage = () => {
  const [responseText, setResponseText] = useState<string>();
  const [socialMedia, setSocialMedia] = useState<SocialMedia>();
  // api.openai.getResponse.useQuery(metrics, {
  //   refetchOnWindowFocus: false,
  //   onSuccess: (data) => {
  //     setResponseText(data.results?.choices?.[0]?.text);
  //   },
  // });

  return (
    <>
      <Head>
        <title>Share Data to Social Media</title>
        <meta
          name="description"
          content="This is an app that was made for a small AI Hackathon for Appfigures."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-900 text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-semibold">Share Data to Social Media</h1>
          <p>Generate a response for social media!</p>
          <div className="flex w-full justify-evenly gap-2">
            <Button onClick={() => setSocialMedia("LinkedIn")}>LinkedIn</Button>
            <Button onClick={() => setSocialMedia("Twitter")}>Twitter</Button>
          </div>
          <p>{responseText}</p>
        </div>
      </main>
    </>
  );
};

export default Home;

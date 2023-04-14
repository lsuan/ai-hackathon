import Head from "next/head";
import { useState } from "react";
import Response from "~/components/Response";
import Button from "~/components/ui/Button";
import Checkbox from "~/components/ui/Checkbox";
import Select from "~/components/ui/Select";

const METRICS = {
  appDownloads: "App Downloads",
  revenue: "Revenue",
  newRatings: "New Ratings",
  currentRating: "Current Rating",
  paidInstalls: "Paid Installs",
};

const PRIOR_DATE_OPTIONS = [7, 14, 28, 60, 90, 120] as const;

type SocialMedia = "Twitter" | "LinkedIn";
type PriorDate = (typeof PRIOR_DATE_OPTIONS)[number];

function Home() {
  const [socialMedia, setSocialMedia] = useState<SocialMedia>();
  const [priorDate, setPriorDate] = useState<PriorDate>(7);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const data = createData(priorDate, selectedMetrics);
  const isQueryEnabled = data !== undefined && socialMedia !== undefined;

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
        <div className="container flex flex-col items-center justify-center gap-12 px-12 py-8 ">
          <h1 className="text-3xl font-semibold">Share Data to Social Media</h1>
          <h2 className="text-xl font-semibold">
            Generate a response for your data on social media!
          </h2>
          <h3 className="text-lg font-semibold">
            Select the specific metrics you want to share
          </h3>
          <Select
            labelName="Prior Days"
            onChange={(e) => setPriorDate(Number(e.target.value) as PriorDate)}
            value={priorDate}
          >
            {PRIOR_DATE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <div className="flex flex-wrap justify-evenly gap-4 px-8">
            {Object.entries(METRICS).map(([key, value]) => (
              <Checkbox
                key={key}
                labelName={value}
                name={key}
                value={key}
                onClick={() =>
                  setSelectedMetrics((metrics) =>
                    metrics.includes(key)
                      ? metrics.filter((metric) => metric !== key)
                      : [...metrics, key]
                  )
                }
              />
            ))}
          </div>
          <h3>Your current data:</h3>
          {data && JSON.stringify(data, null, 2)}
          <div className="flex w-full justify-evenly gap-2">
            <Button onClick={() => setSocialMedia("LinkedIn")}>LinkedIn</Button>
            <Button onClick={() => setSocialMedia("Twitter")}>Twitter</Button>
          </div>
          {isQueryEnabled && <Response data={data} socialMedia={socialMedia} />}
        </div>
      </main>
    </>
  );
}

const createMetrics = (selectedMetrics: string[], metric: string) => {
  if (selectedMetrics.includes(metric)) {
    if (metric === "currentRating") {
      return [metric, Math.random() * 5];
    }
    return [metric, Math.floor(Math.random() * 1000)];
  } else {
    return [undefined, undefined];
  }
};

function createData(
  priorNumber: PriorDate | undefined,
  selectedMetrics: string[]
): Record<string, unknown> | undefined {
  if (priorNumber === undefined || selectedMetrics.length === 0) {
    return;
  }

  const priorData = Object.keys(METRICS).map((metric) =>
    createMetrics(selectedMetrics, metric)
  );
  const currentData = Object.keys(METRICS).map((metric) =>
    createMetrics(selectedMetrics, metric)
  );

  return {
    [`last${priorNumber}Days`]: Object.fromEntries(priorData) as unknown,
    currentPeriod: Object.fromEntries(currentData),
  };
}

export default Home;

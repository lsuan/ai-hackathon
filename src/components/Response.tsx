import { useState } from "react";
import { RiShareCircleFill } from "react-icons/ri";
import Button from "./ui/Button";

interface ResponseProps {
  data: Record<string, unknown>;
  socialMedia: string;
}

function Response({ data, socialMedia }: ResponseProps) {
  const [responseText, setResponseText] = useState<string>();
  const [sentText, setSentText] = useState<string>();
  // const { isLoading } = api.openai.getResponse.useQuery(
  //   {
  //     data,
  //     socialMedia,
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     onSuccess: (data) => {
  //       setResponseText(data.results?.choices?.[0]?.text);
  //     },
  //   }
  // );
  // if (isLoading) {
  //   return <p>Generating response...</p>;
  // }
  return (
    <div className="w-full rounded-xl bg-stone-700 p-6 text-center">
      {/* {isLoading ? (
        <RiLoader4Line className="animate-spin text-2xl text-violet-300" />
      ) : (
        <>
          <h3 className="mb-4 font-semibold">Response</h3>
          <p>{responseText}</p>
        </>
      )} */}
      <Button
        className="mx-auto"
        onClick={() => setSentText(`Shared to ${socialMedia}!`)}
      >
        <span>
          <RiShareCircleFill className="text-xl" />
        </span>
        Share
      </Button>
      {sentText && <p className="mt-4">{sentText}</p>}
    </div>
  );
}

export default Response;

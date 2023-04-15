import { useState } from "react";
import {
  RiCheckboxCircleFill,
  RiLoader4Line,
  RiShareCircleFill,
} from "react-icons/ri";
import { api } from "~/utils/api";
import Button from "./ui/Button";

interface ResponseProps {
  data: Record<string, unknown>;
  socialMedia: string;
}

function Response({ data, socialMedia }: ResponseProps) {
  const [responseText, setResponseText] = useState<string>();
  const [sentText, setSentText] = useState<string>();
  console.log(socialMedia);
  const { isLoading } = api.openai.getResponse.useQuery(
    {
      data,
      socialMedia,
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setResponseText(data?.results?.choices?.[0]?.text);
      },
    }
  );

  return (
    <div className="flex w-full flex-col items-center gap-8 rounded-xl bg-stone-700 p-6 text-center">
      {isLoading ? (
        <RiLoader4Line className="animate-spin text-2xl text-violet-300" />
      ) : (
        <>
          <h3 className="font-semibold">Response</h3>
          <p>{responseText}</p>
        </>
      )}
      <Button onClick={() => setSentText(`Shared to ${socialMedia}!`)}>
        <span>
          <RiShareCircleFill className="text-xl" />
        </span>
        Share
      </Button>
      {sentText && (
        <div className="flex items-center gap-2">
          <span>
            <RiCheckboxCircleFill className="text-xl text-violet-300" />
          </span>
          <p>{sentText}</p>
        </div>
      )}
    </div>
  );
}

export default Response;

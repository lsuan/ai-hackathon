import { useState } from "react";
import {
  RiCheckboxCircleFill,
  RiLinkedinBoxFill,
  RiLoader4Line,
  RiTwitterFill,
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
    <div className="flex w-full flex-col items-center gap-8 rounded-xl bg-stone-700 p-6">
      {isLoading ? (
        <div className="flex flex-wrap gap-2 text-violet-300">
          <RiLoader4Line className="animate-spin text-2xl" />
          <p>Generating Response...</p>
        </div>
      ) : (
        <>
          <h3 className="self-start font-semibold">Response</h3>
          <p>{responseText}</p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => setSentText(`Shared to ${socialMedia}!`)}>
              <span className="text-xl">
                {socialMedia === "LinkedIn" ? (
                  <RiLinkedinBoxFill />
                ) : (
                  <RiTwitterFill />
                )}
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
        </>
      )}
    </div>
  );
}

export default Response;

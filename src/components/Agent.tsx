import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { interviewer } from "@/constants";
import { interviewerTwo } from "@/constants";
import { AgentProps } from "@/types";
import { vapi } from "@/lib/vapi.sdk";
import { useCreateFeedback } from "@/hooks/useInterviews";
import { Ellipsis, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({ userName, interviewSessionId, questions, liveFeedbackEnabled }: AgentProps) => {
  const { mutate: createFeedback } = useCreateFeedback();
  const [callId, setCallId] = useState<string | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      console.log("Call Ended");
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = (messages: SavedMessage[]) => {
      const payload = {
        callId: callId!,
        transcript: messages,
        interviewSessionId: interviewSessionId!,
      };

      createFeedback(payload);
    };

    if (callStatus === CallStatus.FINISHED) {
      toast.success(
        "Generating feedback. This may take a moment. Thank you for your patience."
      );
      handleGenerateFeedback(messages);
    }
  }, [callId, createFeedback, callStatus, interviewSessionId, messages]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    let formattedQuestions = "";

    if (questions) {
      formattedQuestions = questions
        .map((question) => `- ${question}`)
        .join("\n");
    }
    
    const interviewerOptions = liveFeedbackEnabled ? interviewerTwo : interviewer;
    console.log(liveFeedbackEnabled, interviewerOptions);
    const activeCall = await vapi.start(interviewerOptions, {
      variableValues: {
        questions: formattedQuestions,
      },
    });

    setCallId(activeCall?.id || null);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <img
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <img
              src="/user-avatar.svg"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus === "INACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            Call
          </button>
        ) : (
          <div className="flex gap-2">
            <button className="btn-secondary" disabled={true}>
              <span className="relative flex gap-2 items-center">
                <Ellipsis className="w-4 h-4 animate-ping" />
              </span>
            </button>

            {callStatus === "FINISHED" ? (
              <button
                className="btn-disconnect"
                disabled={true}
                onClick={() => handleDisconnect()}
              >
                <span className="relative flex gap-2 items-center">
                  <LoaderCircle className="w-4 h-4 animate-spin" /> End
                </span>
              </button>
            ) : (
              <button
                className={cn("btn-disconnect")}
                onClick={() => handleDisconnect()}
              >
                End
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Agent;

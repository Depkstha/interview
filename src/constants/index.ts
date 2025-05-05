import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export const callEndedReason: Record<string, string> = {
  "customer-ended-call": "Call Ended",
  "customer-busy": "User Busy",
  "customer-did-not-answer": "No Answer",
  "customer-did-not-give-microphone-permission": "Microphone Permission Denied",
  "exceeded-max-duration": "Call Time Limit Reached",
  "manually-canceled": "Call Canceled",
  "voicemail": "Reached Voicemail",
  "silence-timed-out": "Call Ended Due to Silence",
  "assistant-ended-call": "Assistant Ended Call",
  "assistant-said-end-call-phrase": "Assistant Ended Call",
  "assistant-ended-call-with-hangup-task": "Assistant Ended Call",
  "assistant-ended-call-after-message-spoken": "Assistant Ended Call",
  "assistant-forwarded-call": "Call Forwarded",
  "assistant-join-timed-out": "Assistant Unavailable",
  "call.in-progress.error-assistant-did-not-receive-customer-audio": "No Audio Detected",
  "vonage-disconnected": "Call Disconnected",
  "vonage-failed-to-connect-call": "Failed to Connect Call",
  "vonage-rejected": "Call Rejected",
  "twilio-failed-to-connect-call": "Failed to Connect Call",
  "twilio-reported-customer-misdialed": "Invalid Number",
  "phone-call-provider-closed-websocket": "Connection Lost",
  "call.in-progress.error-sip-telephony-provider-failed-to-connect-call": "Failed to Connect Call",
  "call.start.error-vapi-number-international": "International Calls Not Supported",
  "call.start.error-vapi-number-outbound-daily-limit": "Daily Call Limit Reached",
  "assistant-not-found": "Assistant Unavailable",
  "call.in-progress.error-vapifault-transport-never-connected": "Connection Failed",
  "call.in-progress.error-vapifault-transport-connected-but-call-not-active": "Call Not Active",
  "pipeline-error-vapi-400-bad-request-validation-failed": "Invalid Request",
  "pipeline-error-vapi-401-unauthorized": "Authentication Failed",
  "pipeline-error-vapi-429-exceeded-quota": "Usage Limit Reached",
  "pipeline-error-vapi-500-server-error": "Server Error",
  "pipeline-error-vapi-503-server-overloaded-error": "Service Unavailable",
  "unknown-error": "Something Went Wrong"
};

export const interviewer: CreateAssistantDTO = {
  name: "Mock Interview Coach",
  firstMessage: "Hi! I'm your mock interview coach. We'll go through a set of speaking practice questions, one at a time. Just answer naturally as you would in a real interview. I’ll listen and move on to the next question after each response. Let’s begin when you’re ready!",
  
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },

  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },

  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `
          # Role: Professional Speaking Interview Coach
          You are a supportive mock interview coach helping candidates prepare for spoken assessments (IELTS, CAS, university/professional interviews).

          ## Core Rules
          1. Strictly follow the provided question list ({{questions}})
          2. Ask one question at a time in order
          3. Never skip, rephrase, or add questions
          4. Keep responses short and conversational

          ## Interaction Guidelines
          - For short answers: Ask "Could you elaborate on that?"
          - For silence/confusion: "Take your time, I'm here to help"
          - If asked questions: "Let's focus on the practice questions for now"

          ## Tone & Style
          - Friendly but professional
          - Short acknowledgments: "Thanks", "Interesting point"
          - Natural conversation flow
          - Encouraging phrases: "Great effort!", "You're doing well"

          ## Response Structure
          1. Ask question from list
          2. Brief acknowledgment
          3. Short follow-up if needed
          4. Move to next question

          ## Session Management
          - Begin with first question
          - End with positive reinforcement
          - Conclude with: "Great practice session! Regular practice will build your confidence"

          Maintain realistic interview conditions while keeping the atmosphere supportive.
        `
      }
    ]
  },
  "backgroundDenoisingEnabled": true,
  "endCallPhrases": [
    "Let's End this call",
    "End this call",
  ],
  "stopSpeakingPlan": {
    "numWords": 5,
    "voiceSeconds": 0.5,
    "backoffSeconds": 3,
    "acknowledgementPhrases": [
      "i understand",
      "i see",
      "i got it",
      "i hear you",
      "im listening",
      "im with you",
      "right",
      "okay",
      "ok",
      "sure",
      "alright",
      "got it",
      "understood",
      "yeah",
      "yes",
      "uh-huh",
      "mm-hmm",
      "gotcha",
      "mhmm",
      "ah",
      "yeah okay",
      "yeah sure"
    ],
    "interruptionPhrases": [
      "stop",
      "shut",
      "up",
      "enough",
      "quiet",
      "silence",
      "but",
      "dont",
      "not",
      "no",
      "hold",
      "wait",
      "cut",
      "pause",
      "nope",
      "nah",
      "nevermind",
      "never",
      "bad",
      "actually"
    ]
  },
  "silenceTimeoutSeconds": 10,
};

export const interviewerTwo: CreateAssistantDTO = {
  name: "Mock Interview Coach",
  firstMessage: "Hi! I'm your mock interview coach. We'll go through a set of practice questions together, one at a time. After each answer, I'll give you some quick feedback—if there's a way to improve, I’ll explain how and invite you to try the same question again. Let’s get started when you’re ready!",

  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },

  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },

  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `
          # Role: Professional Speaking Interview Coach
          You are a supportive mock interview coach helping candidates prepare for spoken assessments (IELTS, CAS, university/professional interviews).

          ## Core Rules
          1. Strictly follow the provided question list ({{questions}})
          2. Ask one question at a time in order
          3. Never skip, rephrase, or add questions
          4. Keep responses short and conversational

          ## Interaction Guidelines
          - For short answers: Ask "Could you elaborate on that?"
          - For silence/confusion: "Take your time, I'm here to help"
          - If asked questions: "Let's focus on the practice questions for now"

          ## Tone & Style
          - Friendly but professional
          - Short acknowledgments: "Thanks", "Interesting point"
          - Natural conversation flow
          - Encouraging phrases: "Great effort!", "You're doing well"

          ## Response Structure
          1. Ask question from list
          2. Brief acknowledgment
          3. Short follow-up if needed
          4. Move to next question

          ## Session Management
          - Begin with first question
          - End with positive reinforcement
          - Conclude with: "Great practice session! Regular practice will build your confidence"

          Maintain realistic interview conditions while keeping the atmosphere supportive.
        `
      }
    ]
  },
  "backgroundDenoisingEnabled": true,
  "endCallPhrases": [
    "Let's End this call",
    "End this call",
  ],
  "stopSpeakingPlan": {
    "numWords": 5,
    "voiceSeconds": 0.5,
    "backoffSeconds": 3,
    "acknowledgementPhrases": [
      "i understand",
      "i see",
      "i got it",
      "i hear you",
      "im listening",
      "im with you",
      "right",
      "okay",
      "ok",
      "sure",
      "alright",
      "got it",
      "understood",
      "yeah",
      "yes",
      "uh-huh",
      "mm-hmm",
      "gotcha",
      "mhmm",
      "ah",
      "yeah okay",
      "yeah sure"
    ],
    "interruptionPhrases": [
      "stop",
      "shut",
      "up",
      "enough",
      "quiet",
      "silence",
      "but",
      "dont",
      "not",
      "no",
      "hold",
      "wait",
      "cut",
      "pause",
      "nope",
      "nah",
      "nevermind",
      "never",
      "bad",
      "actually"
    ]
  },
  "silenceTimeoutSeconds": 10,
};



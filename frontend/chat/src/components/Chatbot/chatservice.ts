// src/services/chatService.ts
import axios from "axios";
import config from "../../config";

const BASE_URL = config.apiUrl;
const API_URL = BASE_URL + '/chat'

export async function sendChatMessage(question: string, context: string | null) {
  try {
    const res = await axios.post(API_URL, {
      ques: question,
      context: context,
    });

    return {
      ok: true,
      answer: res.data?.response ?? "I could not find an answer in the policies.",
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Request failed unexpectedly";

    return {
      ok: false,
      answer: `Error: ${message}`,
    };
  }
}

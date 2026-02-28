import type { TaskRequestPayload } from "../type/tasks";

export const useTaskManager = () => {
  const taskRequest = async (payload: TaskRequestPayload) => {
    const apiUrl = "https://webhooktask-api.onrender.com/api/sort-word";

    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload.data }),
    });

    const webhookAPI = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=${encodeURIComponent(
      payload.url,
    )}&email=${encodeURIComponent(payload.email)}`;

    const validationResponse = await fetch(webhookAPI);
    const validationText = await validationResponse.text();
    try {
      return JSON.parse(validationText);
    } catch {
      return validationText;
    }
  };
  return { taskRequest };
};

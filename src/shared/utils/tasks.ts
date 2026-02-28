import type { TaskRequestPayload, TaskResponsePayload } from "../type/tasks";

export const toTaskRequestPayload = (
  payload: TaskResponsePayload,
): TaskRequestPayload => {
  return {
    email: payload.email,
    url: payload.url,
    data: payload.data,
  };
};

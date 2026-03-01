import { useState, useEffect } from "react";
import Skelekon from "../components/ui/skelekon";
import FloatingInput from "../components/ui/floating-input";
import { Checkbox } from "../components/ui/checkbox";
import type { TaskRequestPayload } from "../shared/type/tasks";
import { useTaskManager } from "../shared/store/tasks";
import { toast } from "../hooks/use-toast";

export const Index = () => {
  const { taskRequest } = useTaskManager();

  const [task, setTask] = useState<TaskRequestPayload>({
    email: "",
    url: "",
    data: ""
  });
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; url?: string; data?: string }>({});
  const [useDefaultUrl, setUseDefaultUrl] = useState(true);
  const [useDefaultWord, setUseDefaultWord] = useState(true);

  const defaultUrl =
    "https://webhooktask-api.onrender.com/api/sort-word";

  const defaultWord = "Example";

  const onChange =
    (field: keyof TaskRequestPayload) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTask((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    const nextErrors: typeof errors = {};

    if (!task.email) nextErrors.email = "Email is required";
    if (!useDefaultUrl && !task.url)
      nextErrors.url = "Endpoint URL is required";
    if (!useDefaultWord && !task.data)
      nextErrors.data = "Word to sort is required";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length !== 0) return;

        try {
          // Build the payload using defaults when the toggles are enabled
          const requestPayload: TaskRequestPayload = {
            email: task.email,
            url: useDefaultUrl ? defaultUrl : task.url,
            data: useDefaultWord ? defaultWord : task.data,
          };

          const response = await taskRequest(requestPayload);
          console.log("API Response:", response);
          toast({
            title: "Success",
            description: response?.message,
          });
        } catch {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        } finally{
            setIsLoading(false)
        }
  };

  useEffect(() => {
    // Show skeleton briefly while page initializes. Increased to 1s so it's noticeable.
    const t = setTimeout(() => setIsPageLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (isPageLoading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
        <div className="w-full px-4 max-w-2xl">
          <div className="mx-auto bg-white border border-black rounded-2xl p-8 shadow-2xl">
            <Skelekon lines={8} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="w-full px-4 max-w-2xl">
        <div className="mx-auto bg-white border border-black rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-extrabold mb-4 text-black">
            Let&apos;s try out the Webhook Task API!
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <FloatingInput
                label="Email"
                value={task.email}
                onChange={onChange("email")}
                className="border-black"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="useDefaultUrl"
                    checked={useDefaultUrl}
                    onCheckedChange={(checked) =>
                      setUseDefaultUrl(Boolean(checked))
                    }
                    className="border-black data-[state=checked]:bg-black data-[state=checked]:text-white"
                  />
                  <label htmlFor="useDefaultUrl" className="text-sm text-black">
                    Use default URL
                  </label>
                </div>

                <div className="mt-2">
                  {useDefaultUrl ? (
                    <>
                      <FloatingInput
                        label="Endpoint URL"
                        type="text"
                        readOnly
                        value={defaultUrl}
                        className="border-black bg-gray-100 text-black"
                      />
                      <p className="text-sm text-black/70 mt-1">
                        Default URL will be used
                      </p>
                    </>
                  ) : (
                    <>
                      <FloatingInput
                        label="Endpoint URL"
                        type="text"
                        value={task.url}
                        onChange={onChange("url")}
                        className="border-black"
                      />
                      {errors.url && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.url}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="useDefaultWord"
                    checked={useDefaultWord}
                    onCheckedChange={(checked) =>
                      setUseDefaultWord(Boolean(checked))
                    }
                    className="border-black data-[state=checked]:bg-black data-[state=checked]:text-white"
                  />
                  <label htmlFor="useDefaultWord" className="text-sm text-black">
                    Use default word
                  </label>
                </div>

                <div className="mt-2">
                  {useDefaultWord ? (
                    <>
                      <FloatingInput
                        label="Word to sort"
                        type="text"
                        readOnly
                        value={defaultWord}
                        className="border-black bg-gray-100 text-black"
                      />
                      <p className="text-sm text-black/70 mt-1">
                        Default word will be used "Example"
                      </p>
                    </>
                  ) : (
                    <>
                      <FloatingInput
                        label="Word to sort"
                        type="text"
                        value={task.data}
                        onChange={onChange("data")}
                        className="border-black"
                      />
                      {errors.data && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.data}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full rounded-lg px-4 py-3 bg-black hover:bg-black/90 text-white text-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Pushing..." : "Push"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Index;
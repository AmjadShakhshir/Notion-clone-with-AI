// apiHandler.ts
export function handleAsyncErrors(func: any, customErrorMessage: string) {
  return async function (...args: any[]) {
    try {
      return await func(...args);
    } catch (error) {
      console.error(`${customErrorMessage}:`, error);

      // Provide a user-friendly error message
      if ((error as any).response) {
        console.error("API Error Response:", (error as any).response.data);
        return new Response(`Sorry, ${customErrorMessage} due to a server error. Please try again later.`, { status: 500 });
      }

      return new Response(`Sorry, ${customErrorMessage} at this moment.`, { status: 500 });
    }
  };
}

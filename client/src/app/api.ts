const configured = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "");
export const API_URL = configured || "http://localhost:4000";

export class ApiError extends Error {
  constructor(public code: string, message: string, public status: number) {
    super(message);
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`);
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new ApiError(
        data?.error?.code ?? "HTTP_ERROR",
        data?.error?.message ?? "Zahtjev nije uspio.",
        response.status
      );
    }
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("NETWORK_ERROR", "Nije moguće povezati se s poslužiteljem.", 0);
  }
}

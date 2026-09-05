const API_URL = "http://localhost:8000";

export interface AuthUser {
  id: number;
  full_name: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  full_name: string;
  email: string;
  password: string;
}

async function parseResponse(response: Response): Promise<AuthResponse> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Something went wrong. Please try again.",
    );
  }

  return data;
}

export async function login(
  data: LoginData,
): Promise<AuthResponse> {
  const response = await fetch(
    `${API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return parseResponse(response);
}

export async function signup(
  data: SignupData,
): Promise<AuthResponse> {
  const response = await fetch(
    `${API_URL}/api/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return parseResponse(response);
}

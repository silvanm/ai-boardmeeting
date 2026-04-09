import { SignJWT, jwtVerify } from "jose";

export interface MagicLinkPayload {
  email: string;
  name: string;
  generatedBy: string;
}

const MAGIC_LINK_EXPIRY = "48h";

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function createMagicLinkToken(
  payload: MagicLinkPayload
): Promise<string> {
  return new SignJWT({
    email: payload.email,
    name: payload.name,
    generatedBy: payload.generatedBy,
    type: "magic-link",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(MAGIC_LINK_EXPIRY)
    .setJti(crypto.randomUUID())
    .sign(getSecret());
}

export async function verifyMagicLinkToken(
  token: string
): Promise<MagicLinkPayload> {
  const { payload } = await jwtVerify(token, getSecret(), {
    algorithms: ["HS256"],
  });

  if (payload.type !== "magic-link") {
    throw new Error("Invalid token type");
  }

  return {
    email: payload.email as string,
    name: payload.name as string,
    generatedBy: payload.generatedBy as string,
  };
}

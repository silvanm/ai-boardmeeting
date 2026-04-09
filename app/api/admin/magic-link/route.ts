import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createMagicLinkToken } from "@/lib/magic-link";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.email?.endsWith("@muehlemann-popp.ch")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();

  if (!name) {
    return NextResponse.json(
      { error: "name is required" },
      { status: 400 }
    );
  }

  const token = await createMagicLinkToken({
    name,
    generatedBy: session.user.email,
  });

  const baseUrl = process.env.NEXTAUTH_URL || req.nextUrl.origin;
  const magicLink = `${baseUrl}/auth/magic?token=${token}`;

  return NextResponse.json({ magicLink, expiresIn: "48 hours" });
}

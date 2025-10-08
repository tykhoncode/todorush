import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID!);

router.post("/google", async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: "Missing idToken" });

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    if (!payload) return res.status(401).json({ error: "Invalid token" });

    const token = jwt.sign(
      {
        sub: payload.sub,
        email: payload.email,
        name: payload.name
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.cookie("sid", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      ok: true,
      user: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Google token" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("sid", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  res.json({ ok: true, message: "Logged out" });
});

export default router;

import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "accumax_super_secret_key";

export function createToken(payload) {

  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(token) {

  try {

    return jwt.verify(token, JWT_SECRET);

  } catch {

    return null;
  }
}
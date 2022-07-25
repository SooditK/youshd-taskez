import { createSigner, createDecoder, createVerifier } from "fast-jwt";

const secretkey = process.env.JWT_SECRET;

export const sign = createSigner({ key: secretkey });

export const verifier = createVerifier({ key: secretkey });

export const decoder = createDecoder();

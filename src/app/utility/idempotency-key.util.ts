/* eslint-disable @typescript-eslint/no-explicit-any */
export const getIdempotencyRequestFingerprint = async (req: any): Promise<string> => {
  const body = req.body ? JSON.stringify(req.body) : '';
  const rawString = `${req.method}:${req.urlWithParams}:${body}`;

  // Encode the string into bytes
  const msgUint8 = new TextEncoder().encode(rawString);

  // Hash the message using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);

  // Convert buffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return hashHex;
};

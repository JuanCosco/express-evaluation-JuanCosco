import bcrypt from "bcrypt";


export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function compararPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

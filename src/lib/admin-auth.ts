const adminTokens = new Map<string, number>()

export function saveAdminToken(token: string, expiresAt: number) {
  adminTokens.set(token, expiresAt)
}

export function verifyAdminToken(token: string): boolean {
  const expiresAt = adminTokens.get(token)
  if (!expiresAt || expiresAt < Date.now()) {
    adminTokens.delete(token)
    return false
  }
  return true
}

export function removeAdminToken(token: string) {
  adminTokens.delete(token)
}

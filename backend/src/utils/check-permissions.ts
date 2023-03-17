function checkPermissions({
  requestUserId,
  role,
  resourceId,
}: {
  requestUserId: string;
  role: string;
  resourceId: string;
}): boolean {
  if (role === 'admin') return true;

  if (requestUserId === resourceId) return true;

  return false;
}

export default checkPermissions;

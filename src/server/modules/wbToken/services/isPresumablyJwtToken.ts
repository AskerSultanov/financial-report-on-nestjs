var numberOfTokenParts: number = 3;

export var isPresumablyJwtToken = (token: string): boolean => {
  if (typeof token !== 'string') {
    return false;
  }

  var tokenHasThreeParts: boolean =
    token.split('.').length === numberOfTokenParts;

  if (!tokenHasThreeParts) {
    return false;
  }

  return true;
};

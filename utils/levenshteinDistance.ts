export const calculateLevenshteinDistance = (str1: string, str2: string) => {
  const m = str1.length;
  const n = str2.length;

  // Créer une matrice de distances
  const dp: any = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // Calculer la distance de Levenshtein
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // Suppression
        dp[i][j - 1] + 1, // Insertion
        dp[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  // Retourner la distance de Levenshtein
  return dp[m][n];
};

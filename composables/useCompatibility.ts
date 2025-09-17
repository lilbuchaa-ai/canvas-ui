interface CompatibilityData {
  score: number;
  summary: string;
  strengths: string[];
  challenges: string[];
  advice: string;
}

export const useCompatibility = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const calculate = async (date1: string, date2: string): Promise<CompatibilityData> => {
    loading.value = true;
    error.value = null;

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock data - replace with real API call later
      const mockData: CompatibilityData = {
        score: Math.floor(Math.random() * 30) + 70, // 70-100%
        summary: "Your cosmic energies create a harmonious blend of passion and understanding. The stars suggest a deep connection that transcends the ordinary.",
        strengths: [
          "Complementary communication styles",
          "Shared values and life goals",
          "Strong emotional connection",
          "Mutual respect and admiration"
        ],
        challenges: [
          "Different approaches to conflict resolution",
          "Varying social energy levels",
          "Potential for stubbornness in decisions"
        ],
        advice: "Embrace your differences as opportunities for growth. The celestial dance between your signs creates a beautiful balance when you work together as a team."
      };

      return mockData;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to calculate compatibility';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading: readonly(loading),
    error: readonly(error),
    calculate
  };
};
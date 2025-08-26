import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  chartsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  chartsContainerLarge: {
    padding: 24,
    marginBottom: 24,
  },
  chartsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  chartsTitleLarge: {
    fontSize: 20,
    marginBottom: 20,
  },
  chartsContent: {
    flexDirection: 'column',
  },
  chartsContentLarge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  chartContainerLarge: {
    flex: 1,
    minWidth: 300,
    maxWidth: 400,
    marginBottom: 0,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 8,
  },
});

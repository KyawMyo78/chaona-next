import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

interface EnvironmentalChartsProps {
  isLargeScreen: boolean;
}

export default function EnvironmentalCharts({ isLargeScreen }: EnvironmentalChartsProps) {
  const { width: screenWidth } = useWindowDimensions();
  const { t } = useTranslation();
  
  // Chart dimensions based on screen size
  const chartWidth = isLargeScreen ? Math.min(screenWidth - 200, 600) : screenWidth - 60;
  const chartHeight = 220;

  // Realistic data for environmental impact over the last 12 months
  // CO2 data shows seasonal variations (higher in harvest seasons)
  const co2Data = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [
      {
        data: [145, 167, 189, 234, 298, 356, 423, 489, 534, 478, 412, 367],
        color: (opacity = 1) => `rgba(21, 128, 61, ${opacity})`, // green color
        strokeWidth: 3,
      },
    ],
  };

  // Waste processed data shows harvest season peaks (Jul-Nov)
  const wasteProcessedData = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [
      {
        data: [1840, 2120, 2560, 3200, 4100, 5670, 6890, 7450, 8200, 7680, 6890, 5430],
        color: (opacity = 1) => `rgba(21, 128, 61, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  // Farmers helped data shows gradual growth with slight seasonal dips
  const farmersHelpedData = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [
      {
        data: [1250, 1340, 1450, 1580, 1720, 1890, 2050, 2180, 2340, 2290, 2150, 2080],
        color: (opacity = 1) => `rgba(21, 128, 61, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(21, 128, 61, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
    style: {
      borderRadius: 12,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#15803d',
      fill: '#ffffff',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#e5e7eb',
      strokeWidth: 1,
    },
    propsForLabels: {
      fontSize: 12,
      fontFamily: 'System',
    },
  };

  return (
    <View style={[styles.chartsContainer, isLargeScreen && styles.chartsContainerLarge]}>
      <Text style={[styles.chartsTitle, isLargeScreen && styles.chartsTitleLarge]}>
        {t('dashboard.charts.title')}
      </Text>
      
      <View style={[styles.chartsContent, isLargeScreen && styles.chartsContentLarge]}>
        {/* CO2 Savings Chart */}
        <View style={[styles.chartContainer, isLargeScreen && styles.chartContainerLarge]}>
          <Text style={styles.chartTitle}>{t('dashboard.charts.co2Savings')}</Text>
          <LineChart
            data={co2Data}
            width={isLargeScreen ? Math.min((screenWidth - 240) / 3, 400) : chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            style={styles.chart}
            bezier
          />
        </View>

        {/* Waste Processed Chart */}
        <View style={[styles.chartContainer, isLargeScreen && styles.chartContainerLarge]}>
          <Text style={styles.chartTitle}>{t('dashboard.charts.wasteProcessed')}</Text>
          <LineChart
            data={wasteProcessedData}
            width={isLargeScreen ? Math.min((screenWidth - 240) / 3, 400) : chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            style={styles.chart}
            bezier
          />
        </View>

        {/* Farmers Helped Chart */}
        <View style={[styles.chartContainer, isLargeScreen && styles.chartContainerLarge]}>
          <Text style={styles.chartTitle}>{t('dashboard.charts.farmersHelped')}</Text>
          <LineChart
            data={farmersHelpedData}
            width={isLargeScreen ? Math.min((screenWidth - 240) / 3, 400) : chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            style={styles.chart}
            bezier
          />
        </View>
      </View>
    </View>
  );
}

const grafanaBaseUrl =
  import.meta.env.VITE_GRAFANA_BASE_URL || window.location.origin;

export const grafanaDashboardUrl =
  `${grafanaBaseUrl}/d/bot_monitoring?orgId=1&refresh=5s&kiosk=tv`;

export const botAnalyticsSoloUrl =
  `${grafanaBaseUrl}/d-solo/e5ca1a71-ebd8-49de-b980-83d89a5088fb/bot-analytics-and-health`;

export const botMonitoringSoloUrl =
  `${grafanaBaseUrl}/d-solo/bot_monitoring/bot-and-server-monitoring`;

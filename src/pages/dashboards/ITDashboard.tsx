import React, { memo } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { ServerIcon, ShieldCheckIcon, UsersIcon, ActivityIcon, HardDriveIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon, DatabaseIcon, FileTextIcon, SettingsIcon, ArrowRightIcon, RefreshCwIcon, BarChart4Icon, CircleIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Mock data for system metrics
const systemMetricsData = [{
  time: '00:00',
  cpu: 25,
  memory: 40,
  disk: 62
}, {
  time: '04:00',
  cpu: 20,
  memory: 38,
  disk: 62
}, {
  time: '08:00',
  cpu: 35,
  memory: 45,
  disk: 63
}, {
  time: '12:00',
  cpu: 65,
  memory: 60,
  disk: 65
}, {
  time: '16:00',
  cpu: 45,
  memory: 55,
  disk: 65
}, {
  time: '20:00',
  cpu: 30,
  memory: 48,
  disk: 65
}, {
  time: 'Now',
  cpu: 28,
  memory: 45,
  disk: 66
}];
// Mock data for recent security alerts
const securityAlerts = [{
  id: '1',
  type: 'Suspicious Login',
  description: 'Multiple failed login attempts detected from IP 203.45.78.92',
  severity: 'high',
  timestamp: '2023-11-03 14:23:05',
  status: 'open'
}, {
  id: '2',
  type: 'Database Query',
  description: 'Unusual database query pattern detected from admin account',
  severity: 'medium',
  timestamp: '2023-11-02 09:45:12',
  status: 'investigating'
}, {
  id: '3',
  type: 'System Update',
  description: 'Critical security patches applied successfully',
  severity: 'info',
  timestamp: '2023-11-01 22:00:00',
  status: 'resolved'
}, {
  id: '4',
  type: 'Firewall Alert',
  description: 'Port scanning attempt blocked from external network',
  severity: 'medium',
  timestamp: '2023-10-31 18:12:45',
  status: 'resolved'
}];
// Mock data for system services
const systemServices = [{
  id: '1',
  name: 'Database Server',
  status: 'operational',
  uptime: '99.98%',
  lastRestart: '2023-10-15 02:00:00'
}, {
  id: '2',
  name: 'Web Application',
  status: 'operational',
  uptime: '99.95%',
  lastRestart: '2023-10-20 03:15:00'
}, {
  id: '3',
  name: 'Authentication Service',
  status: 'operational',
  uptime: '99.99%',
  lastRestart: '2023-10-15 02:00:00'
}, {
  id: '4',
  name: 'Backup Service',
  status: 'degraded',
  uptime: '98.75%',
  lastRestart: '2023-11-01 04:30:00'
}, {
  id: '5',
  name: 'Email Service',
  status: 'operational',
  uptime: '99.90%',
  lastRestart: '2023-10-25 01:45:00'
}];
// Mock data for recent user activities
const userActivities = [{
  id: '1',
  user: 'admin@lendology.com',
  action: 'User account created',
  resource: 'User: juan.delacruz@example.com',
  timestamp: '2023-11-03 15:42:18',
  ipAddress: '192.168.1.5'
}, {
  id: '2',
  user: 'maria.santos@lendology.com',
  action: 'Password reset',
  resource: 'User: maria.santos@lendology.com',
  timestamp: '2023-11-03 14:15:32',
  ipAddress: '192.168.1.10'
}, {
  id: '3',
  user: 'system',
  action: 'Backup completed',
  resource: 'Database: production',
  timestamp: '2023-11-03 03:00:05',
  ipAddress: 'localhost'
}, {
  id: '4',
  user: 'pedro.reyes@lendology.com',
  action: 'Permission changed',
  resource: 'Role: Loan Officer',
  timestamp: '2023-11-02 11:23:45',
  ipAddress: '192.168.1.15'
}];
// Format date/time
const formatDateTime = (dateTimeString: string) => {
  return new Date(dateTimeString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
// Get severity indicator
const getSeverityIndicator = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'high':
      return {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-400',
        icon: <AlertCircleIcon className="w-3 h-3 mr-1" />,
        label: 'High'
      };
    case 'medium':
      return {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-700 dark:text-amber-400',
        icon: <AlertCircleIcon className="w-3 h-3 mr-1" />,
        label: 'Medium'
      };
    case 'low':
      return {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-400',
        icon: <AlertCircleIcon className="w-3 h-3 mr-1" />,
        label: 'Low'
      };
    case 'info':
    default:
      return {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-400',
        icon: <CheckCircleIcon className="w-3 h-3 mr-1" />,
        label: 'Info'
      };
  }
};
// Get status indicator
const getStatusIndicator = (status: string) => {
  switch (status.toLowerCase()) {
    case 'resolved':
    case 'operational':
      return {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-400',
        icon: <CheckCircleIcon className="w-3 h-3 mr-1" />,
        label: status === 'resolved' ? 'Resolved' : 'Operational'
      };
    case 'investigating':
    case 'degraded':
      return {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-700 dark:text-amber-400',
        icon: <ClockIcon className="w-3 h-3 mr-1" />,
        label: status === 'investigating' ? 'Investigating' : 'Degraded'
      };
    case 'open':
    case 'down':
      return {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-400',
        icon: <AlertCircleIcon className="w-3 h-3 mr-1" />,
        label: status === 'open' ? 'Open' : 'Down'
      };
    default:
      return {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-400',
        icon: <ClockIcon className="w-3 h-3 mr-1" />,
        label: 'Unknown'
      };
  }
};
// Custom tooltip for charts
const CustomTooltip = ({
  active,
  payload,
  label
}: any) => {
  if (active && payload && payload.length) {
    return <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-md border border-[rgba(var(--border-color),0.2)]">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => <p key={`item-${index}`} style={{
        color: entry.color
      }}>
            {entry.name}: {entry.value}%
          </p>)}
      </div>;
  }
  return null;
};
export const ITDashboard = () => {
  return <>
      <PageHeader title="IT Dashboard" description="System Management and Support" />
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                System Status
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">Healthy</h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <CheckCircleIcon className="w-3 h-3 mr-1" />
                <span>All systems operational</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <ServerIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Security Alerts
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">2</h3>
              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                <AlertCircleIcon className="w-3 h-3 mr-1" />
                <span>Needs attention</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <ShieldCheckIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Active Users
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">128</h3>
              <p className="text-xs text-[rgb(var(--text-secondary))]">
                Last 24 hours
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <UsersIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                System Uptime
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">99.98%</h3>
              <p className="text-xs text-[rgb(var(--text-secondary))]">
                Last 30 days
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <ActivityIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
      </div>
      {/* System Metrics Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BarChart4Icon className="w-5 h-5 text-neon-red" />
            System Resource Usage
          </h3>
          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))]">
            <RefreshCwIcon size={16} />
          </button>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={systemMetricsData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="cpu" name="CPU" stroke="rgb(var(--neon-red))" activeDot={{
              r: 8
            }} strokeWidth={2} />
              <Line type="monotone" dataKey="memory" name="Memory" stroke="#3182CE" activeDot={{
              r: 8
            }} strokeWidth={2} />
              <Line type="monotone" dataKey="disk" name="Disk" stroke="#38A169" activeDot={{
              r: 8
            }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Security Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-neon-red" />
              Recent Security Alerts
            </h3>
            <button className="text-sm text-neon-red flex items-center hover:underline">
              <span>View all</span>
              <ArrowRightIcon className="ml-1 w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {securityAlerts.map(alert => {
            const severityInfo = getSeverityIndicator(alert.severity);
            const statusInfo = getStatusIndicator(alert.status);
            return <div key={alert.id} className="border-b border-[rgba(var(--border-color),0.1)] pb-4 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium flex items-center">
                      {alert.type}
                      <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${severityInfo.bg} ${severityInfo.text}`}>
                        {severityInfo.icon}
                        {severityInfo.label}
                      </span>
                    </h4>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                      {statusInfo.icon}
                      {statusInfo.label}
                    </span>
                  </div>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">
                    {alert.description}
                  </p>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    {formatDateTime(alert.timestamp)}
                  </p>
                </div>;
          })}
          </div>
        </div>
        {/* System Services */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <HardDriveIcon className="w-5 h-5 text-neon-red" />
              System Services
            </h3>
            <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))]">
              <RefreshCwIcon size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
              <thead className="bg-gray-50 dark:bg-gray-700/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Uptime
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Last Restart
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
                {systemServices.map(service => {
                const statusInfo = getStatusIndicator(service.status);
                return <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center">
                          {service.status === 'operational' ? <CircleIcon className="w-2 h-2 mr-2 text-green-500" /> : service.status === 'degraded' ? <CircleIcon className="w-2 h-2 mr-2 text-amber-500" /> : <CircleIcon className="w-2 h-2 mr-2 text-red-500" />}
                          {service.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                          {statusInfo.icon}
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {service.uptime}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {formatDateTime(service.lastRestart)}
                      </td>
                    </tr>;
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* User Activity Log */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileTextIcon className="w-5 h-5 text-neon-red" />
            Recent User Activity
          </h3>
          <button className="text-sm text-neon-red flex items-center hover:underline">
            <span>View all logs</span>
            <ArrowRightIcon className="ml-1 w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
            <thead className="bg-gray-50 dark:bg-gray-700/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
              {userActivities.map(activity => <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {formatDateTime(activity.timestamp)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    {activity.user}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {activity.action}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {activity.resource}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {activity.ipAddress}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] mt-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-neon-red" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors flex flex-col items-center justify-center text-center">
            <UsersIcon className="w-8 h-8 mb-2 text-neon-red" />
            <span className="text-sm font-medium">User Management</span>
          </button>
          <button className="p-4 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors flex flex-col items-center justify-center text-center">
            <DatabaseIcon className="w-8 h-8 mb-2 text-neon-red" />
            <span className="text-sm font-medium">Database Backup</span>
          </button>
          <button className="p-4 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors flex flex-col items-center justify-center text-center">
            <FileTextIcon className="w-8 h-8 mb-2 text-neon-red" />
            <span className="text-sm font-medium">System Logs</span>
          </button>
          <button className="p-4 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors flex flex-col items-center justify-center text-center">
            <SettingsIcon className="w-8 h-8 mb-2 text-neon-red" />
            <span className="text-sm font-medium">System Settings</span>
          </button>
        </div>
      </div>
    </>;
};
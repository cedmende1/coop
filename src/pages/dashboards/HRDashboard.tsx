import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { UsersIcon, UserCheckIcon, CalendarIcon, BriefcaseIcon, ClipboardListIcon, TrendingUpIcon, UserPlusIcon, UserMinusIcon, CheckCircleIcon, ClockIcon, XCircleIcon, ArrowRightIcon, FileTextIcon } from 'lucide-react';
// Mock data for staff attendance
const staffAttendance = [{
  id: '1',
  name: 'Maria Santos',
  position: 'HR Manager',
  status: 'present',
  timeIn: '08:02 AM',
  timeOut: '05:15 PM'
}, {
  id: '2',
  name: 'Pedro Reyes',
  position: 'Loan Officer',
  status: 'present',
  timeIn: '08:15 AM',
  timeOut: '05:30 PM'
}, {
  id: '3',
  name: 'Ana Gonzales',
  position: 'Accountant',
  status: 'late',
  timeIn: '09:45 AM',
  timeOut: '05:50 PM'
}, {
  id: '4',
  name: 'Juan Dela Cruz',
  position: 'Member Services',
  status: 'absent',
  timeIn: '-',
  timeOut: '-'
}, {
  id: '5',
  name: 'Sofia Lim',
  position: 'IT Specialist',
  status: 'present',
  timeIn: '08:05 AM',
  timeOut: '05:10 PM'
}];
// Mock data for pending member approvals
const pendingMemberApprovals = [{
  id: 'M001',
  name: 'Roberto Garcia',
  submissionDate: '2023-11-01',
  status: 'pending',
  documents: 3
}, {
  id: 'M002',
  name: 'Carmen Velasquez',
  submissionDate: '2023-10-30',
  status: 'pending',
  documents: 4
}, {
  id: 'M003',
  name: 'Eduardo Tan',
  submissionDate: '2023-10-29',
  status: 'incomplete',
  documents: 2
}, {
  id: 'M004',
  name: 'Isabella Reyes',
  submissionDate: '2023-10-28',
  status: 'pending',
  documents: 5
}];
// Mock data for recent activities
const recentActivities = [{
  id: '1',
  date: '2023-11-03',
  activity: 'New member registered',
  user: 'Maria Santos',
  details: 'Processed registration for Roberto Garcia'
}, {
  id: '2',
  date: '2023-11-02',
  activity: 'Member documents verified',
  user: 'Pedro Reyes',
  details: 'Verified 4 documents for Carmen Velasquez'
}, {
  id: '3',
  date: '2023-11-02',
  activity: 'Staff training completed',
  user: 'Ana Gonzales',
  details: 'Completed customer service training module'
}, {
  id: '4',
  date: '2023-11-01',
  activity: 'Leave request approved',
  user: 'Maria Santos',
  details: 'Approved leave request for Juan Dela Cruz'
}];
// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
// Status indicator styling and icons
const getStatusIndicator = (status: string) => {
  switch (status.toLowerCase()) {
    case 'present':
      return {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-400',
        icon: <CheckCircleIcon className="w-3 h-3 mr-1" />,
        label: 'Present'
      };
    case 'late':
      return {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-700 dark:text-amber-400',
        icon: <ClockIcon className="w-3 h-3 mr-1" />,
        label: 'Late'
      };
    case 'absent':
      return {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-400',
        icon: <XCircleIcon className="w-3 h-3 mr-1" />,
        label: 'Absent'
      };
    case 'incomplete':
      return {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-700 dark:text-amber-400',
        icon: <ClockIcon className="w-3 h-3 mr-1" />,
        label: 'Incomplete'
      };
    case 'pending':
    default:
      return {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-400',
        icon: <ClockIcon className="w-3 h-3 mr-1" />,
        label: 'Pending'
      };
  }
};
export const HRDashboard = () => {
  return <>
      <PageHeader title="HR Dashboard" description="Human Resources Management Center" />
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Total Staff
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">42</h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+2 from last month</span>
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
                Pending Approvals
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">12</h3>
              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                <ClockIcon className="w-3 h-3 mr-1" />
                <span>Needs review</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <UserCheckIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                New Members
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">28</h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>This month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <UserPlusIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Attrition Rate
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">3.2%</h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>-0.5% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <UserMinusIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
      </div>
      {/* Staff Attendance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-neon-red" />
            Today's Staff Attendance
          </h3>
          <div className="text-sm text-[rgb(var(--text-secondary))]">
            {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Staff Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Position
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Time In
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Time Out
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
              {staffAttendance.map(staff => {
              const statusInfo = getStatusIndicator(staff.status);
              return <tr key={staff.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {staff.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {staff.position}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {staff.timeIn}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {staff.timeOut}
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pending Member Approvals */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <UserCheckIcon className="w-5 h-5 text-neon-red" />
              Pending Member Approvals
            </h3>
            <button className="text-sm text-neon-red flex items-center hover:underline">
              <span>View all</span>
              <ArrowRightIcon className="ml-1 w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
                {pendingMemberApprovals.map(member => {
                const statusInfo = getStatusIndicator(member.status);
                return <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        {member.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {formatDate(member.submissionDate)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                          {statusInfo.icon}
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {member.documents} files
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                          Review
                        </button>
                      </td>
                    </tr>;
              })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ClipboardListIcon className="w-5 h-5 text-neon-red" />
              Recent HR Activities
            </h3>
            <button className="text-sm text-neon-red flex items-center hover:underline">
              <span>View all</span>
              <ArrowRightIcon className="ml-1 w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map(activity => <div key={activity.id} className="border-b border-[rgba(var(--border-color),0.1)] pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">{activity.activity}</h4>
                    <p className="text-xs text-[rgb(var(--text-secondary))]">
                      {activity.details}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{activity.user}</p>
                    <p className="text-xs text-[rgb(var(--text-secondary))]">
                      {formatDate(activity.date)}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BriefcaseIcon className="w-5 h-5 text-neon-red" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors flex flex-col items-center justify-center text-center">
            <UserPlusIcon className="w-8 h-8 mb-2 text-neon-red" />
            <span className="text-sm font-medium">Add New Staff</span>
          </button>
          <button className="p-4 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors flex flex-col items-center justify-center text-center">
            <FileTextIcon className="w-8 h-8 mb-2 text-neon-red" />
            <span className="text-sm font-medium">Generate Reports</span>
          </button>
          <button className="p-4 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors flex flex-col items-center justify-center text-center">
            <CalendarIcon className="w-8 h-8 mb-2 text-neon-red" />
            <span className="text-sm font-medium">Schedule Training</span>
          </button>
          <button className="p-4 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors flex flex-col items-center justify-center text-center">
            <ClipboardListIcon className="w-8 h-8 mb-2 text-neon-red" />
            <span className="text-sm font-medium">Manage Leave Requests</span>
          </button>
        </div>
      </div>
    </>;
};
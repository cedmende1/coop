type Role = 'admin' | 'it' | 'member' | 'accounting' | 'hr' | 'treasury' | 'director';
interface RoleAccess {
  [key: string]: Role[];
}
// Define which roles can access which routes
export const roleAccess: RoleAccess = {
  '/dashboard': ['admin', 'it', 'member', 'accounting', 'hr', 'treasury', 'director'],
  '/members': ['admin', 'hr', 'director', 'treasury', 'accounting'],
  '/member-approvals': ['admin', 'hr', 'director', 'accounting'],
  '/member-registration': ['admin', 'hr'],
  '/borrowers': ['admin', 'accounting'],
  '/withdrawal-requests': ['accounting', 'treasury'],
  '/deposit-requests': ['accounting', 'treasury'],
  '/system-logs': ['admin', 'it'],
  '/loans': ['admin', 'accounting', 'director', 'treasury', 'hr'],
  '/repayments': ['admin', 'accounting', 'treasury'],
  '/loan-calculator': ['admin', 'accounting', 'member', 'director', 'treasury'],
  // Member/Director specific routes
  '/request-loan': ['member', 'admin', 'director'],
  '/deposit-shares': ['member', 'admin', 'director'],
  '/account-dividend': ['member', 'admin', 'director'],
  '/documents': ['member', 'admin', 'director'],
  '/support': ['member', 'admin', 'director', 'it'],
  // Finance routes
  '/general-ledger': ['admin', 'accounting', 'treasury'],
  '/revenue-analysis': ['admin', 'accounting', 'treasury'],
  '/capital-shares': ['admin', 'accounting', 'treasury'],
  '/statements': ['admin', 'accounting', 'treasury'],
  '/reports': ['admin', 'accounting', 'treasury'],
  '/funds-management': ['admin', 'treasury'],
  // User profile routes - accessible to all roles
  '/profile': ['admin', 'it', 'member', 'accounting', 'hr', 'treasury', 'director'],
  '/settings': ['admin', 'it', 'member', 'accounting', 'hr', 'treasury', 'director'],
  '/notifications': ['admin', 'it', 'member', 'accounting', 'hr', 'treasury', 'director'],
  // Director/IT specific routes
  '/users': ['admin', 'director', 'it'],
  '/announcements': ['admin', 'director'],
  '/system-config': ['admin', 'director', 'it'],
  // IT specific routes
  '/content-management': ['admin', 'it']
};
export const canAccess = (role: string, path: string): boolean => {
  const allowedRoles = roleAccess[path];
  return allowedRoles ? allowedRoles.includes(role as Role) : false;
};
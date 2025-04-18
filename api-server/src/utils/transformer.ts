import { User, TransformedData, DepartmentSummary } from '../types';

/**
 * Transforms user data from the API into a summary grouped by department
 *
 * Performance optimizations:
 * 1. Uses Map for initial grouping for faster lookups
 * 2. Tracks min/max age during iteration instead of using Math.min/max later
 * 3. Uses proper TypeScript types for better type safety
 *
 * @param users Array of user objects from the API
 * @returns Object with departments as keys and summary data as values
 */
export function transformUsers(users: User[]): TransformedData {
  // Use Map for better performance with object keys
  const departmentMap = new Map<string, DepartmentSummary & { minAge: number; maxAge: number }>();

  // Process all users in a single pass
  for (const user of users) {
    const dept = user.company.department;

    // Get or initialize department summary
    if (!departmentMap.has(dept)) {
      departmentMap.set(dept, {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
        minAge: Infinity,
        maxAge: -Infinity
      });
    }

    const deptSummary = departmentMap.get(dept)!;

    // Update gender count
    if (user.gender === 'male') {
      deptSummary.male += 1;
    } else if (user.gender === 'female') {
      deptSummary.female += 1;
    }

    // Track min and max age directly
    deptSummary.minAge = Math.min(deptSummary.minAge, user.age);
    deptSummary.maxAge = Math.max(deptSummary.maxAge, user.age);

    // Update hair color count
    const hairColor = user.hair.color;
    deptSummary.hair[hairColor] = (deptSummary.hair[hairColor] || 0) + 1;

    // Update address mapping
    const fullName = `${user.firstName}${user.lastName}`;
    deptSummary.addressUser[fullName] = user.address.postalCode;
  }

  // Convert Map to the expected output format
  const result: TransformedData = {};

  departmentMap.forEach((summary, department) => {
    const { minAge, maxAge, ...rest } = summary;
    result[department] = {
      ...rest,
      ageRange: `${minAge === Infinity ? 0 : minAge}-${maxAge === -Infinity ? 0 : maxAge}`
    };
  });

  return result;
}

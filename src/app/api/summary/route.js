import { NextResponse } from 'next/server';

/**
 * Transforms user data from the API into a summary grouped by department
 */
function transformUsers(users) {
  const summary = {};

  // Process each user
  for (const user of users) {
    // Get department from user data
    const department = user.company?.department;
    if (!department) continue; // Skip if no department

    // Initialize department if not exists
    if (!summary[department]) {
      summary[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
        _ages: [] // Temporary array to track ages
      };
    }

    // Update department summary
    const deptSummary = summary[department];

    // Count by gender
    if (user.gender === 'male') {
      deptSummary.male += 1;
    } else if (user.gender === 'female') {
      deptSummary.female += 1;
    }

    // Track ages for range calculation
    deptSummary._ages.push(user.age);

    // Count hair colors
    const hairColor = user.hair?.color;
    if (hairColor) {
      deptSummary.hair[hairColor] = (deptSummary.hair[hairColor] || 0) + 1;
    }

    // Add address mapping
    const fullName = `${user.firstName}${user.lastName}`;
    if (user.address?.postalCode) {
      deptSummary.addressUser[fullName] = user.address.postalCode;
    }
  }

  // Calculate age ranges and remove temporary _ages array
  for (const dept in summary) {
    const ages = summary[dept]._ages;
    if (ages.length > 0) {
      const minAge = Math.min(...ages);
      const maxAge = Math.max(...ages);
      summary[dept].ageRange = `${minAge}-${maxAge}`;
    } else {
      summary[dept].ageRange = "0-0";
    }
    delete summary[dept]._ages;
  }

  return summary;
}

export async function GET() {
  try {
    // Use native fetch instead of axios
    const response = await fetch('https://dummyjson.com/users');

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const result = transformUsers(data.users);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
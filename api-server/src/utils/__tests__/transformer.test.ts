import { transformUsers } from '../transformer';
import { User } from '../../types';

describe('transformUsers', () => {
  // Test case 1: Basic functionality with a simple dataset
  test('should correctly transform user data by department', () => {
    // Mock user data
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        gender: 'male',
        email: 'john@example.com',
        phone: '1234567890',
        username: 'johndoe',
        password: 'password',
        birthDate: '1993-01-01',
        image: 'image-url',
        bloodGroup: 'A+',
        height: 180,
        weight: 80,
        eyeColor: 'blue',
        hair: {
          color: 'Black',
          type: 'straight'
        },
        domain: 'example.com',
        ip: '192.168.1.1',
        address: {
          address: '123 Main St',
          city: 'New York',
          coordinates: {
            lat: 40.7128,
            lng: -74.0060
          },
          postalCode: '10001',
          state: 'NY'
        },
        macAddress: '00:00:00:00:00:00',
        university: 'Example University',
        bank: {
          cardExpire: '01/25',
          cardNumber: '1234567890123456',
          cardType: 'visa',
          currency: 'USD',
          iban: 'US123456789'
        },
        company: {
          address: {
            address: '456 Business St',
            city: 'New York',
            coordinates: {
              lat: 40.7128,
              lng: -74.0060
            },
            postalCode: '10002',
            state: 'NY'
          },
          department: 'Engineering',
          name: 'Example Inc',
          title: 'Software Engineer'
        },
        ein: '12-3456789',
        ssn: '123-45-6789',
        userAgent: 'Mozilla/5.0'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        age: 25,
        gender: 'female',
        email: 'jane@example.com',
        phone: '0987654321',
        username: 'janesmith',
        password: 'password',
        birthDate: '1998-05-15',
        image: 'image-url',
        bloodGroup: 'B+',
        height: 165,
        weight: 60,
        eyeColor: 'brown',
        hair: {
          color: 'Brown',
          type: 'curly'
        },
        domain: 'example.com',
        ip: '192.168.1.2',
        address: {
          address: '789 Oak St',
          city: 'Los Angeles',
          coordinates: {
            lat: 34.0522,
            lng: -118.2437
          },
          postalCode: '90001',
          state: 'CA'
        },
        macAddress: '11:11:11:11:11:11',
        university: 'Another University',
        bank: {
          cardExpire: '05/27',
          cardNumber: '9876543210987654',
          cardType: 'mastercard',
          currency: 'USD',
          iban: 'US987654321'
        },
        company: {
          address: {
            address: '321 Corporate Blvd',
            city: 'Los Angeles',
            coordinates: {
              lat: 34.0522,
              lng: -118.2437
            },
            postalCode: '90002',
            state: 'CA'
          },
          department: 'Marketing',
          name: 'Example Inc',
          title: 'Marketing Manager'
        },
        ein: '98-7654321',
        ssn: '987-65-4321',
        userAgent: 'Mozilla/5.0'
      },
      {
        id: 3,
        firstName: 'Bob',
        lastName: 'Johnson',
        age: 35,
        gender: 'male',
        email: 'bob@example.com',
        phone: '5555555555',
        username: 'bobjohnson',
        password: 'password',
        birthDate: '1988-10-20',
        image: 'image-url',
        bloodGroup: 'O+',
        height: 175,
        weight: 75,
        eyeColor: 'green',
        hair: {
          color: 'Blond',
          type: 'wavy'
        },
        domain: 'example.com',
        ip: '192.168.1.3',
        address: {
          address: '456 Pine St',
          city: 'Chicago',
          coordinates: {
            lat: 41.8781,
            lng: -87.6298
          },
          postalCode: '60601',
          state: 'IL'
        },
        macAddress: '22:22:22:22:22:22',
        university: 'Third University',
        bank: {
          cardExpire: '12/26',
          cardNumber: '5555555555555555',
          cardType: 'amex',
          currency: 'USD',
          iban: 'US555555555'
        },
        company: {
          address: {
            address: '789 Business Ave',
            city: 'Chicago',
            coordinates: {
              lat: 41.8781,
              lng: -87.6298
            },
            postalCode: '60602',
            state: 'IL'
          },
          department: 'Engineering',
          name: 'Example Inc',
          title: 'Senior Engineer'
        },
        ein: '55-5555555',
        ssn: '555-55-5555',
        userAgent: 'Mozilla/5.0'
      }
    ];

    // Expected output after transformation
    const expectedOutput = {
      'Engineering': {
        male: 2,
        female: 0,
        ageRange: '30-35',
        hair: {
          'Black': 1,
          'Blond': 1
        },
        addressUser: {
          'JohnDoe': '10001',
          'BobJohnson': '60601'
        }
      },
      'Marketing': {
        male: 0,
        female: 1,
        ageRange: '25-25',
        hair: {
          'Brown': 1
        },
        addressUser: {
          'JaneSmith': '90001'
        }
      }
    };

    // Call the function with mock data
    const result = transformUsers(mockUsers);

    // Assert the result matches the expected output
    expect(result).toEqual(expectedOutput);
  });

  // Test case 2: Empty array
  test('should return an empty object when given an empty array', () => {
    const result = transformUsers([]);
    expect(result).toEqual({});
  });

  // Test case 3: Edge case - users with same department but different attributes
  test('should correctly aggregate users with the same department', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: 'User',
        lastName: 'One',
        age: 20,
        gender: 'male',
        email: 'user1@example.com',
        phone: '1111111111',
        username: 'user1',
        password: 'password',
        birthDate: '2003-01-01',
        image: 'image-url',
        bloodGroup: 'A+',
        height: 180,
        weight: 80,
        eyeColor: 'blue',
        hair: {
          color: 'Black',
          type: 'straight'
        },
        domain: 'example.com',
        ip: '192.168.1.1',
        address: {
          address: '123 Main St',
          city: 'New York',
          coordinates: {
            lat: 40.7128,
            lng: -74.0060
          },
          postalCode: '10001',
          state: 'NY'
        },
        macAddress: '00:00:00:00:00:00',
        university: 'Example University',
        bank: {
          cardExpire: '01/25',
          cardNumber: '1234567890123456',
          cardType: 'visa',
          currency: 'USD',
          iban: 'US123456789'
        },
        company: {
          address: {
            address: '456 Business St',
            city: 'New York',
            coordinates: {
              lat: 40.7128,
              lng: -74.0060
            },
            postalCode: '10002',
            state: 'NY'
          },
          department: 'Sales',
          name: 'Example Inc',
          title: 'Sales Rep'
        },
        ein: '12-3456789',
        ssn: '123-45-6789',
        userAgent: 'Mozilla/5.0'
      },
      {
        id: 2,
        firstName: 'User',
        lastName: 'Two',
        age: 40,
        gender: 'female',
        email: 'user2@example.com',
        phone: '2222222222',
        username: 'user2',
        password: 'password',
        birthDate: '1983-01-01',
        image: 'image-url',
        bloodGroup: 'B+',
        height: 165,
        weight: 60,
        eyeColor: 'brown',
        hair: {
          color: 'Brown',
          type: 'curly'
        },
        domain: 'example.com',
        ip: '192.168.1.2',
        address: {
          address: '789 Oak St',
          city: 'Los Angeles',
          coordinates: {
            lat: 34.0522,
            lng: -118.2437
          },
          postalCode: '90001',
          state: 'CA'
        },
        macAddress: '11:11:11:11:11:11',
        university: 'Another University',
        bank: {
          cardExpire: '05/27',
          cardNumber: '9876543210987654',
          cardType: 'mastercard',
          currency: 'USD',
          iban: 'US987654321'
        },
        company: {
          address: {
            address: '321 Corporate Blvd',
            city: 'Los Angeles',
            coordinates: {
              lat: 34.0522,
              lng: -118.2437
            },
            postalCode: '90002',
            state: 'CA'
          },
          department: 'Sales',
          name: 'Example Inc',
          title: 'Sales Manager'
        },
        ein: '98-7654321',
        ssn: '987-65-4321',
        userAgent: 'Mozilla/5.0'
      }
    ];

    const expectedOutput = {
      'Sales': {
        male: 1,
        female: 1,
        ageRange: '20-40',
        hair: {
          'Black': 1,
          'Brown': 1
        },
        addressUser: {
          'UserOne': '10001',
          'UserTwo': '90001'
        }
      }
    };

    const result = transformUsers(mockUsers);
    expect(result).toEqual(expectedOutput);
  });

  // Test case 4: Performance test with a larger dataset
  test('should handle a larger dataset efficiently', () => {
    // Create a larger mock dataset
    const largeDataset: User[] = [];
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
    const hairColors = ['Black', 'Brown', 'Blond', 'Red', 'Gray'];
    
    // Generate 1000 mock users
    for (let i = 0; i < 1000; i++) {
      const deptIndex = i % departments.length;
      const hairIndex = i % hairColors.length;
      const gender = i % 2 === 0 ? 'male' : 'female';
      
      largeDataset.push({
        id: i,
        firstName: `First${i}`,
        lastName: `Last${i}`,
        age: 20 + (i % 50), // Ages from 20 to 69
        gender,
        email: `user${i}@example.com`,
        phone: `${i}`.padStart(10, '0'),
        username: `user${i}`,
        password: 'password',
        birthDate: '2000-01-01',
        image: 'image-url',
        bloodGroup: 'A+',
        height: 170,
        weight: 70,
        eyeColor: 'blue',
        hair: {
          color: hairColors[hairIndex],
          type: 'straight'
        },
        domain: 'example.com',
        ip: `192.168.1.${i % 255}`,
        address: {
          address: `${i} Main St`,
          city: 'City',
          coordinates: {
            lat: 0,
            lng: 0
          },
          postalCode: `${10000 + i}`,
          state: 'State'
        },
        macAddress: '00:00:00:00:00:00',
        university: 'University',
        bank: {
          cardExpire: '01/25',
          cardNumber: '1234567890123456',
          cardType: 'visa',
          currency: 'USD',
          iban: 'US123456789'
        },
        company: {
          address: {
            address: `${i} Business St`,
            city: 'City',
            coordinates: {
              lat: 0,
              lng: 0
            },
            postalCode: `${20000 + i}`,
            state: 'State'
          },
          department: departments[deptIndex],
          name: 'Company',
          title: 'Title'
        },
        ein: '12-3456789',
        ssn: '123-45-6789',
        userAgent: 'Mozilla/5.0'
      });
    }

    // Measure execution time
    const startTime = performance.now();
    const result = transformUsers(largeDataset);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    // Basic assertions to verify the result
    expect(Object.keys(result).length).toBe(departments.length);
    
    // Check that all departments are present
    departments.forEach(dept => {
      expect(result).toHaveProperty(dept);
    });

    // Log performance metrics
    console.log(`Transformation of 1000 users took ${executionTime.toFixed(2)}ms`);
    
    // Ensure execution time is reasonable (adjust threshold as needed)
    // This is a soft assertion as performance can vary by environment
    expect(executionTime).toBeLessThan(1000); // Should process 1000 records in less than 1 second
  });
});

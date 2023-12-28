module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testEnvironment: 'jsdom',
  //   preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(less|css)$': 'jest-less-loader', // 支持less
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testMatch: ['**/__tests__/*.(js|jsx|ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
// 注意 与 package.json的 jest 配置互斥

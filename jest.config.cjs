/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jest-environment-jsdom", // Spécifie l'environnement de test
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], // Transforme les fichiers TypeScript et JSX
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  transformIgnorePatterns: [
    "/node_modules/(?!@mui|@testing-library)" // Transforme également les modules spécifiques si nécessaire
  ],
};
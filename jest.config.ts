// jest.config.ts

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    },
};

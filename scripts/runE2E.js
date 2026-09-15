import cypress from 'cypress';

delete process.env.ELECTRON_RUN_AS_NODE;

const result = await cypress.run();

process.exitCode = result.failures || result.totalFailed ? 1 : 0;

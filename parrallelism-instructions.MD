# Instructions and Notes

## In this session ...

** Understanding Playwright Parallelism **

1. Do you know the number of CPU of your current machine?
   `node -e "console. log('CPU cores:', require('os') .cpus() . length)"'
   CPU cores: 12

2. Do you know how many tests you have in the current projects?
   Total: 31 tests in 21 files
   npx playwright test -- list'

3. What are the key components/setting affect the parall runs?
   *Projects (browsers)
   *spec files (test)
   *Config (fullyparallel: true/false)
   *Max Parallel Worker = 50% System Core (6 if 12 cores)
4. Reference:
5. Done!

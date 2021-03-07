const requireContext = require('node-require-context')
/**
 * Automatically imports all the jobs and exports as a single module object
 */
const requireJob = requireContext('.', false, /\.job\.js$/);
const jobs = {};

requireJob.keys().forEach(filename => {

    const jobName = filename
        .replace(/(\.\/|\.job\.js)/g, '')
        .replace(/^\w/, c => c.toUpperCase())

    jobs[jobName] = requireJob(filename).default || requireJob(filename);
});

export default jobs;
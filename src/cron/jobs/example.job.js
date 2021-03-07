const cron = require("node-cron");


cron.schedule("* * * * *", function () {
    startJob();
});

function startJob() {
    console.log("---------------------");
    console.log("Running Cron Job");
}

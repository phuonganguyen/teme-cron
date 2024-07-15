import cron from "node-cron";

const initCrons = () => {
  cron.schedule("* * * * *", () => {
    console.log("running a task every minute");
  });
};

export default initCrons;

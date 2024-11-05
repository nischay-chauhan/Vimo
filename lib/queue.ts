import {Queue} from "bullmq"
import { connection } from "./redis"

export const JobsQueue = new Queue("jobsQueue", {
    connection,
    defaultJobOptions: {
        attempts: 2,
        backoff: {
            type: "exponential",
            delay: 5000
        },
    },
})
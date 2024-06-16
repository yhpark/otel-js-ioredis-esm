import { trace } from "@opentelemetry/api";
import { Redis } from "ioredis"

const tracer = trace.getTracer("test");

async function main() {
  await tracer.startActiveSpan("test", async (span) => {
    const redis = new Redis("redis://localhost:6379");

    // not instrumented
    await redis.set("test", "data");

    // this is instrumented correctly (http, tcp, ...)
    await fetch("https://google.com");

    span.end();
  });

  // The process must live for at least the interval past any traces that
  // must be exported, or some risk being lost if they are recorded after the
  // last export.
  console.log(
    "Sleeping 5 seconds before shutdown to ensure all records are flushed."
  );
  setTimeout(() => {
    console.log("Completed.");
  }, 5000);
}

main();

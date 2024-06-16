import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";

const sdk = new NodeSDK({
  serviceName: "test",
  traceExporter: new ConsoleSpanExporter(),
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-ioredis": {
        enabled: true,
        requireParentSpan: false,
      },
      "@opentelemetry/instrumentation-fs": { enabled: false }
    }),
  ],
});

sdk.start();

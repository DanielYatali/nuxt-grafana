import {getWebInstrumentations, initializeFaro} from '@grafana/faro-web-sdk';

import {TracingInstrumentation} from '@grafana/faro-web-tracing';

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    let instrumentation = [...getWebInstrumentations()]
    //Commenting this out and the import results in the error not happening
    instrumentation.push(new TracingInstrumentation({
        instrumentationOptions: {
            propagateTraceHeaderCorsUrls: [new RegExp('https://example/*'), new RegExp('https://test-example/*')]
        }
    }))
    const faro = initializeFaro({
        url: config.public.grafanaUrl,
        instrumentations: instrumentation,
        app: {
            name: "test-app",
            version: config.public.version,
            environment: config.public.environment
        },
    });
    console.log('Faro initialized')
    nuxtApp.provide('faro', faro)
})
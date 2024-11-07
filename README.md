# nestjs-loopback-nhost

A comparing of the performance NestJS (rest/graphql) with Loopback4 and Nhost (Hasura API) is presented. Grafana K6 is used as a benchmark.

## VM Machine specs
* Virtual Environmnent: Proxmox 6.4-4
* CPU family: Intel Xeon E5-2696v3@2.3GHz
* CPU cores: 2
* RAM: 2GB

## Benchmarks
### Ping Rest benchmark
This test compares the pure performance of REST in loopback4 and NestJS+fastify
After running the command:
```
    k6 run k6/k6_rest_ping.js --vus=1000 --duration=10m
```
we get the following results:
- Loopback4 Rest:
```
     checks.........................: 99.13% 748666 out of 755195
     data_received..................: 213 MB 343 kB/s
     data_sent......................: 87 MB  140 kB/s
     http_req_blocked...............: avg=37.66ms  min=0s      med=3.29Вµs   max=15.49s  p(90)=5.18Вµs   p(95)=21.86Вµs 
     http_req_connecting............: avg=37.65ms  min=0s      med=0s       max=15.49s  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=661.67ms min=0s      med=380.91ms max=1m0s    p(90)=423.71ms p(95)=446.34ms
       { expected_response:true }...: avg=405.88ms min=1.31ms  med=380.88ms max=59.82s  p(90)=423.01ms p(95)=442.21ms
     http_req_failed................: 0.86%  6529 out of 755195
     http_req_receiving.............: avg=47.51Вµs  min=0s      med=38.32Вµs  max=35.58ms p(90)=47.08Вµs  p(95)=53.12Вµs 
     http_req_sending...............: avg=41.49Вµs  min=0s      med=15.24Вµs  max=61.8ms  p(90)=37.61Вµs  p(95)=39.58Вµs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=661.58ms min=0s      med=380.85ms max=1m0s    p(90)=423.64ms p(95)=446.25ms
     http_reqs......................: 755195 1213.886535/s
     iteration_duration.............: avg=797.02ms min=30.62ms med=381.15ms max=1m0s    p(90)=424.45ms p(95)=450.99ms
     iterations.....................: 755195 1213.886535/s
     vus............................: 11     min=11               max=1000
     vus_max........................: 1000   min=1000             max=1000

```

- NestJS Rest:
```
     checks.........................: 100.00% 3572736 out of 3572736
     data_received..................: 929 MB  1.5 MB/s
     data_sent......................: 414 MB  691 kB/s
     http_req_blocked...............: avg=34.11Вµs  min=1.57Вµs  med=2.29Вµs   max=195.02ms p(90)=3.17Вµs   p(95)=3.64Вµs  
     http_req_connecting............: avg=26.83Вµs  min=0s      med=0s       max=194.99ms p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=167.35ms min=4.14ms  med=149.77ms max=30.57s   p(90)=234.69ms p(95)=279.6ms 
       { expected_response:true }...: avg=167.35ms min=4.14ms  med=149.77ms max=30.57s   p(90)=234.69ms p(95)=279.6ms 
     http_req_failed................: 0.00%   0 out of 3572736
     http_req_receiving.............: avg=1.01ms   min=15.63Вµs med=25.88Вµs  max=281.12ms p(90)=41.93Вµs  p(95)=134.77Вµs
     http_req_sending...............: avg=41.06Вµs  min=5.34Вµs  med=7.72Вµs   max=224.52ms p(90)=9.83Вµs   p(95)=18.18Вµs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=166.3ms  min=4.11ms  med=149.68ms max=30.57s   p(90)=229.4ms  p(95)=269.72ms
     http_reqs......................: 3572736 5952.90027/s
     iteration_duration.............: avg=167.92ms min=4.19ms  med=149.96ms max=30.74s   p(90)=235.92ms p(95)=282.53ms
     iterations.....................: 3572736 5952.90027/s
     vus............................: 1000    min=1000               max=1000
     vus_max........................: 1000    min=1000               max=1000

```

We can see that the NestJS Rest is ~4.9 times faster than the Loopback4 Rest.


### Ping GraphQL benchmark
A similar ping test as the previous one, but for comparison NestJS GraphQL with Hasura GraphQL.

Benchmark commands:
```
    k6 run k6/k6_graphql_ping.js --vus=1000 --duration=10m
    k6 run k6/k6_nhost_graphql_ping.js --vus=1000 --duration=10m
```
And results:

- Hasura GraphQL:
```
     checks.........................: 100.00% 952746 out of 952746
     data_received..................: 201 MB  335 kB/s
     data_sent......................: 230 MB  382 kB/s
     http_req_blocked...............: avg=166.83Вµs min=1.98Вµs  med=3.16Вµs   max=377.41ms p(90)=4.23Вµs   p(95)=5.65Вµs  
     http_req_connecting............: avg=160.88Вµs min=0s      med=0s       max=377.38ms p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=629.56ms min=15.96ms med=624.47ms max=1.46s    p(90)=701.19ms p(95)=751.93ms
       { expected_response:true }...: avg=629.56ms min=15.96ms med=624.47ms max=1.46s    p(90)=701.19ms p(95)=751.93ms
     http_req_failed................: 0.00%   0 out of 952746
     http_req_receiving.............: avg=77.79Вµs  min=19.86Вµs med=39.93Вµs  max=154.26ms p(90)=59.35Вµs  p(95)=70.92Вµs 
     http_req_sending...............: avg=40.92Вµs  min=8.22Вµs  med=12.34Вµs  max=166.91ms p(90)=33.76Вµs  p(95)=41.76Вµs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=629.44ms min=15.89ms med=624.37ms max=1.46s    p(90)=701.05ms p(95)=751.76ms
     http_reqs......................: 952746  1586.559343/s
     iteration_duration.............: avg=629.86ms min=16.08ms med=624.65ms max=1.68s    p(90)=701.5ms  p(95)=752.35ms
     iterations.....................: 952746  1586.559343/s
     vus............................: 1000    min=1000             max=1000
     vus_max........................: 1000    min=1000             max=1000

```

- NestJS GraphQL
```
     checks.........................: 99.99%  2951618 out of 2951623
     data_received..................: 756 MB  1.3 MB/s
     data_sent......................: 679 MB  1.1 MB/s
     http_req_blocked...............: avg=64.16Вµs  min=1.61Вµs  med=2.4Вµs    max=286.17ms p(90)=3.48Вµs   p(95)=4.09Вµs  
     http_req_connecting............: avg=58.48Вµs  min=0s      med=0s       max=286.13ms p(90)=0s       p(95)=0s      
   вњ“ http_req_duration..............: avg=202.79ms min=10.26ms med=185.96ms max=59.89s   p(90)=264.14ms p(95)=305.01ms
       { expected_response:true }...: avg=202.69ms min=10.26ms med=185.96ms max=59.68s   p(90)=264.14ms p(95)=305.01ms
   вњ“ http_req_failed................: 0.00%   5 out of 2951623
     http_req_receiving.............: avg=878.59Вµs min=0s      med=26.55Вµs  max=273.27ms p(90)=48.89Вµs  p(95)=149.83Вµs
     http_req_sending...............: avg=46.6Вµs   min=7.03Вµs  med=9.46Вµs   max=173.75ms p(90)=17.5Вµs   p(95)=34.14Вµs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=201.87ms min=10.23ms med=185.89ms max=59.89s   p(90)=260.02ms p(95)=294.88ms
     http_reqs......................: 2951623 4917.887375/s
     iteration_duration.............: avg=203.25ms min=15.17ms med=186.13ms max=1m0s     p(90)=265.26ms p(95)=307.65ms
     iterations.....................: 2951623 4917.887375/s
     vus............................: 1000    min=1000               max=1000
     vus_max........................: 1000    min=1000               max=1000
```

In this test, NestJS GraphQL is 3.0 times faster then Hasura GraphQL.

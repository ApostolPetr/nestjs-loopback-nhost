# nestjs-loopback-nhost

Compare nestjs+graphql+passport performance with loopback4 and nhost

## install k6 for benchmark
See https://grafana.com/docs/k6/latest/set-up/install-k6/

### OS fine-tuning
```
    sysctl -w net.ipv4.ip_local_port_range="1024 65535"
    sysctl -w net.ipv4.tcp_tw_reuse=1
    sysctl -w net.ipv4.tcp_timestamps=1
    ulimit -n 250000
```

Run 
```
    k6 run k6/k6_xxx.js --vus=20000 --duration=10m
```

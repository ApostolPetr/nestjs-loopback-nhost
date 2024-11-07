# Grafana k6

## Prepare
- install k6 for benchmark:
https://grafana.com/docs/k6/latest/set-up/install-k6/
- run OS finetune
[os_finetune.sh](./os_finetune.sh)

## Running k6 benchmark:
```
    k6 run k6/k6_xxx.js --vus=1000 --duration=10m
```


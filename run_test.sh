#!/usr/bin/env bash

python3 demo.py  --net_name aod \
                 --use_gpu true \
                 --gpu 3 \
                 --model_dir /home/cyanzeus/AOD-Net/model \
                 --ckpt AOD_9.pkl

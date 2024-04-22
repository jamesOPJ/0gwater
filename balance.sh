#!/usr/bin/env bash
evmosd q bank balances $(evmosd keys show wallet -a) << EOF
11111111
EOF

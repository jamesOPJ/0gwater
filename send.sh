#!/usr/bin/expect
spawn evmosd tx bank send wallet $1 1000000aevmos --gas=1 --gas-prices=1aevmos -y
expect "*passphrase*"
send "11111111\r"

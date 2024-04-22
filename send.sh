expect <<EOF
spawn evmosd tx bank send wallet $1 1000000aevmos --gas=500000 --gas-prices=99999aevmos -y
expect "*passphrase*"
send "11111111\r"
EOF



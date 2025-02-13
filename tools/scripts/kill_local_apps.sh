#!/usr/bin/env sh

echo "\033[32m✔\033[m Kill local apps"
user_client_user_pid="$(lsof -t -i :4200)"
if [[ "" !=  "$user_client_user_pid" ]]; then
    echo "killing client user"
    kill -9 $user_client_user_pid
fi
user_client_demo_pid="$(lsof -t -i :4201)"
if [[ "" !=  "$user_client_demo_pid" ]]; then
    echo "killing client demo"
    kill -9 $user_client_demo_pid
fi
server_pid="$(lsof -t -i :3000)"
if [[ "" !=  "$server_pid" ]]; then
    echo "killing server"
    kill -9 $server_pid
fi
exit 0

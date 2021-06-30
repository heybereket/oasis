#!/bin/bash

# this example requires ueberzug installed
# you can install it using your favorite package
# manager as most linux distributions have it in
# their official repositories

IMAGE=$(../../bin/oasis get_post_by_id $1 --json | jq -r '.imageName')

render_image() {
	{
    declare -Ap add_command=([action]="add" [identifier]="example1" [x]="10" [y]="10" [path]="/tmp/$1.jpg")
    sleep 120
	} | ueberzug layer --parser bash
}

if [ $IMAGE == "null" ]; then
	echo "This post does not have an image attached to it"
else
	wget $IMAGE -O /tmp/$1.jpg

	render_image $1
fi

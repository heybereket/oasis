#!/bin/bash
# this example requires jq and glow installed

POSTS=$(../../bin/oasis fetch_posts --limit 5 --json | jq)

for post in $(echo "${POSTS}" | jq -r '.[] | @base64'); do
    _jq() {
     echo ${post} | base64 --decode | jq -r ${1}
    }

   echo $(_jq '.message') | glow -
done

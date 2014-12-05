guard :shell do
  watch /(scss|js|html)$/ do
    `open -g http://reload.extensions && sleep 2 && chrome-canary-cli reload`
  end
end

guard :shell do
  watch /(scss|js|html)$/ do
    `open -g http://reload.extensions && sleep 3 && chrome-canary-cli reload`
  end
end

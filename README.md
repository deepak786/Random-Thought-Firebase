# Random-Thought-Firebase
Get the random thought from Firebase records.

## key.json
Download your serviceAccountKey from Firebase Project under **settings/Service Accounts** tab and then click on **Generate new private key** button. Put the contents of that file into this file.

## Import Dummy Data from data.json
Import the json file "data.json" into your Firebase realtime database under path "${DATABASE_URL}/thoughts/".

## database rules
Make sure to put an index on the path "thoughts" for the child "createdAt". See the screenshot `rules.png`

## Run the Script and test
After importing the dummy data from data.json, you can run the script as
`node script.js`


// set up the firebase
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://thoughts-sample.firebaseio.com"
});

// get the realtime database object
var firebase = admin.database();

// min timetamp in the database
var min = 1577441685097;
// max timestamp
var max = new Date().getTime();

// generate random timestamp.
function getRndTimestamp(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// get the random thought
async function getRandomThought(){
    var randomTime = getRndTimestamp(min, max);
    
    var limit = 1;
    // get 1 thoughts equal or after this timestamp
    var snap = await firebase.ref('thoughts')
        .orderByChild('createdAt')
        .startAt(randomTime)
        .limitToFirst(limit)
        .once('value');

    if(snap.exists()){
        // we have the data
        parseSnapshot(snap);
    }else{
        // there are no thougths equal ro after the random time
        // so get the thoughts before that timestamp.
        snap = await firebase.ref('thoughts')
            .orderByChild('createdAt')
            .endAt(randomTime)
            .limitToLast(limit)
            .once('value');
        
        if(snap.exists()){
            // we have the data
            parseSnapshot(snap);
        }else{
            // probably there are no thoughts in the database.
            console.log('No Random thought found');
        }
    }

    return null;
}

function parseSnapshot(snap){
    snap.forEach((child)=>{
        console.log(child.val());
    });
}

getRandomThought()
.then(()=>{
    process.exit(0);
});
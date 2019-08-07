$(document).ready(function () {
    // Initialize Firebase (Satchels's firebase database)
    var firebaseConfig = {
        apiKey: "AIzaSyDCE-6Pb4wmBqZ_10kmlXmAY1vEiOail5U",
        authDomain: "train-scheduler-54ff3.firebaseapp.com",
        databaseURL: "https://train-scheduler-54ff3.firebaseio.com",
        projectId: "train-scheduler-54ff3",
        storageBucket: "",
        messagingSenderId: "539337910444",
        appId: "1:539337910444:web:79553d9924ef5696"
      };

    firebase.initializeApp(firebaseConfig);


    // - - - - - - - - - - - - - - - - - - - - - - -  // 

    var database = firebase.database();

    $(document).on('click', '#submit-train', function (event) {
        event.preventDefault();

        database.ref().push({
            name: $('#train-name').val(),
            destination: $('#train-destination').val(),
            trainStartTime: $('#train-start-time').val(),
            frequency: $('#train-frequency').val()
        });
    });

    database.ref().on("child_added", function (snapshot) {
        // snapshot.val() == data object
        let newRow = $('<tr>')

        //Name
        newRow.append($('<td>').html(snapshot.val().name))

        //Destination
        newRow.append($('<td>').html(snapshot.val().destination))

        //Train Frequency
        newRow.append($('<td>').html(snapshot.val().frequency))

        // let currentTime = moment().format("HH:mm"
        //Define various time related variables
        let firstTrain = moment(snapshot.val().trainStartTime, "HH:mm")
        var diffTime = moment().diff(firstTrain, 'minutes')
        var tRemainder = diffTime % (snapshot.val().frequency)

        var minutesTillTrain = snapshot.val().frequency - tRemainder

        var nextArrivalTime = moment().add(minutesTillTrain, "minutes").format("hh:mm")

        //Next Arrival 
        newRow.append($('<td>').html(nextArrivalTime))

        //Minutes Away
        newRow.append($('<td>').html(minutesTillTrain))


        // console.log("CURRENT TIME", currentTime)
        console.log("FIRST TRAIN TIME", firstTrain)
        console.log("REMAINDER", tRemainder)
        console.log("MINUTES TILL NEXT TRAIN", minutesTillTrain)
        console.log("NEXT ARRIVAL TIME", nextArrivalTime)
        console.log("DIFF TIME", diffTime)

        // console.log("DIFFERENCE", moment().subtract(firstTrain).format("HH:mm"))

        // let firstTrainTime = firstTrain.format("HH:mm")
        // console.log("FIRST", firstTrainTime)    



        // console.log("DIFF:", currentTime.diff(firstTrainTime, "minutes"))

        // let nextArrival = currentTime - (snapshot.val().trainStartTime)

        // console.log(nextArrival)

        // newRow.append($('<td>').html(nextArrival))

        // Total Billed (IGNORE THIS)
        // newRow.append($('<td>').html(snapshot.val().rate * totalMonths))

        $('#table-body').append(newRow)
    });

});
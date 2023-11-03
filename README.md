// <!DOCTYPE html>
<html>
<head>
    <title>Week Number</title>
</head>
<body>
    <p id="weekNumber"></p>

    <script>
        // Get the current date
        var currentDate = new Date();

        // Get the week number
        var weekNumber = getWeekNumber(currentDate);

        // Display the week number in the HTML document
        document.getElementById("weekNumber").textContent = "Current week number: " + weekNumber;

        // Function to calculate the week number
        function getWeekNumber(date) {
            var d = new Date(date);
            d.setHours(0, 0, 0, 0);
            d.setDate(d.getDate() + 4 - (d.getDay() || 7));
            var yearStart = new Date(d.getFullYear(), 0, 1);
            var weekNumber = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
            return weekNumber;
        }
    </script>
</body>
</html>

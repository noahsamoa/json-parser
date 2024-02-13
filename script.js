$(document).ready(function () {

    $("#convertBtn").on("click", function () {

        var jsonInput = $("#jsonInput").val();

        // Check if the input is a URL
        if (isValidUrl(jsonInput)) {
            fetch(jsonInput)
                .then(response => response.json())
                .then(jsonData => renderTable(jsonData))
                .catch(error => alert("Error fetching JSON from URL: " + error));
        } else {
            try {
                var jsonData = JSON.parse(jsonInput);
                renderTable(jsonData);
            } catch (error) {
                alert("Invalid JSON format or URL!");
            }
        }


    });

    function renderTable(data) {
        var $tableBody = $("#jsonTable tbody");
        $tableBody.empty();

        function renderRow(key, value, isEvenRow) {
            var $row = $("<tr>").addClass(isEvenRow ? "bg-gray-100" : "bg-gray-200");
            $row.append(
                $("<td>")
                    .text(key)
                    .addClass("font-semibold bg-gray-300 border")
            );

            if (typeof value === "object") {
                $row.append(
                    $("<td>").append(renderObject(value)).addClass("border json-table-cell") // Add json-table-cell class
                );
            } else {
                $row.append($("<td>").text(value).addClass("json-table-cell border")); // Add json-table-cell class
            }

            return $row;
        }

        function renderObject(obj) {
            var $table = $("<table>").addClass(
                "table-auto border-collapse border border-gray-200"
            );
            var $tbody = $("<tbody>");

            var isEvenRow = true;
            for (var key in obj) {
                var $row = renderRow(key, obj[key], isEvenRow);
                isEvenRow = !isEvenRow;
                $tbody.append($row);
            }

            $table.append($tbody);
            return $table;
        }

        var isEvenRow = true;

        for (var key in data) {
            var $row = renderRow(key, data[key], isEvenRow);
            isEvenRow = !isEvenRow;
            $tableBody.append($row);
        }
    }

    // Function to check if a string is a valid URL
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }
});

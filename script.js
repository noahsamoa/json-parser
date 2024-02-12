 $(document).ready(function() {
      $("#convertBtn").on("click", function() {
        var jsonInput = $("#jsonInput").val();
        try {
          var jsonData = JSON.parse(jsonInput);
          renderTable(jsonData);
        } catch (error) {
          alert("Invalid JSON format!");
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
            .addClass("px-4 py-2 font-semibold bg-gray-300 border")
          );

          if (typeof value === "object") {
            $row.append(
              $("<td>").append(renderObject(value)).addClass("px-4 py-2 border")
            );
          } else {
            $row.append($("<td>").text(value).addClass("px-4 py-2 border json-table-cell"));
          }

          return $row;
        }

        function renderObject(obj) {
          var $table = $("<table>").addClass(
            "table-auto border-collapse border border-gray-200 w-full"
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
    });

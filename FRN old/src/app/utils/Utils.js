var Utils = {
  busquedaDataTable(datatable) {
    datatable.columns().every(function () {
      var column = this;
      var value;
      var input_filter_timeout;

      $("input", this.footer()).on("keyup change", function (val) {
        console.log(val);
        value = "";
        if (column.search() !== value && (value.length >= 1 || value === "")) {
          clearTimeout(input_filter_timeout);

          input_filter_timeout = setTimeout(function () {
            column.search(value).draw();
          }, 0); // 1000 miliseg = 1 seg.
        }
      });

      $("select", this.footer()).on("change", function () {
        column.search($(this).val()).draw();
      });
    });
  },
};

module.exports = {Utils};

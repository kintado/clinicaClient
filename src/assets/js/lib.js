var productsTable = null;
function init_view(view_name)
{
    if (view_name == 'home' || view_name == 'login')
    {
        sitebgcolor('#0084c6');
        document.getElementById('navbardiv').style.display = 'none';
    }
    else
    {
        sitebgcolor('transparent');
        document.getElementById('navbardiv').style.display = 'block';
    }



}

function redrawDataTable(tablename)
{
    var table = $('#'+tablename).DataTable();

    table.page.len(10).draw();

}
function destroyDataTable(tablename)
{
    var table = $('#'+tablename).DataTable();
    table.destroy();
}

function regenerateDataTable(tablename)
{
    var table = $('#'+tablename).DataTable();
    table.destroy();

}


function initDataTable(tablename) {
  var htmltableobj = $(`#${tablename}`);

  // Controlla se è già una DataTable
  if ($.fn.DataTable.isDataTable(`#${tablename}`)) {
    var table = htmltableobj.DataTable();
    table.destroy();

    // Rimuovi le righe dei filtri precedenti
    $(`#${tablename} thead tr.filters`).empty();
  }

  var filtersRow = $(`#${tablename} thead tr.filters`);
  if (filtersRow.length === 0) {
    filtersRow = $(`#${tablename} thead tr`)
      .not('.filters') // Evita di clonare le righe dei filtri
      .clone(true)
      .addClass('filters')
      .appendTo(`#${tablename} thead`);
  } else {
    filtersRow.empty();
  }

  var table = htmltableobj.DataTable({
    columnDefs: [
      { orderable: false, targets: 0 }
    ],
    paging: false, // Disabilita la paginazione
    orderCellsTop: true,
    fixedHeader: true,
    order: [[1, 'desc']],
    initComplete: function () {
      var api = this.api();

      // Per ogni colonna
      api.columns().eq(0).each(function (colIdx) {
        if (colIdx == 2  || colIdx == 5) {
          var cell = filtersRow.find('th').eq($(api.column(colIdx).header()).index());

          // Verifica se il box dei filtri è già presente
          if (!cell.find('input').length) {
            var title = $(cell).text();
            if (colIdx == 5)
            {
              $(cell).html('<input type="text" placeholder="' + title + '" id="barcodefilter"/>');
            }
            else
            {
              $(cell).html('<input type="text" placeholder="' + title + '" />');
            }

            $('input', cell)
              .off('keyup change')
              .on('change', function (e) {
                $(this).attr('title', $(this).val());
                var regexr = '({search})';
                var cursorPosition = this.selectionStart;

                api.column(colIdx)
                  .search(this.value != ''
                    ? regexr.replace('{search}', '(((' + this.value + ')))')
                    : '', this.value != '', this.value == '')
                  .draw();
              })
              .on('keyup', function (e) {
                e.stopPropagation();
                $(this).trigger('change');
                $(this).focus()[0].setSelectionRange(cursorPosition, cursorPosition);
              });
          }
        }
      });
    },
  });


  table.on('page.dt', table.functionOnPageChange);
  productsTable = table;
}

function filterByBarcode(tableID, barcode) {
  // Supponendo che 'table' sia la tua istanza di DataTable
  var table = $('#'+tableID).DataTable();

  // Applica il filtro alla colonna 5
  table
    .column(5)
    .search(barcode)
    .draw();
}


$(function() {
    
    
    Morris.Area({
        element: 'morris-area-chart0',
        data: [{ period: '2020-10', facturas: 9, notascredito: 5, notasdebito: null },
        { period: '2020-11', facturas: 95, notascredito: 11, notasdebito: null },
            { period: '2020-12', facturas: 482, notascredito: 102, notasdebito: 1 },
            { period: '2021-01', facturas: 328, notascredito: 39, notasdebito: null },
            { period: '2021-02', facturas: 57, notascredito: 14, notasdebito: null },
            { period: '2021-03', facturas: 12, notascredito: 2, notasdebito: null }],
        xkey: 'period',
        ykeys: ['facturas', 'notascredito', 'notasdebito'],
        labels: ['Facturas', 'Notas Credito', 'Notas Debito'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true,
        lineColors: ['#ffcc00', '#15284c','#000000'],
        lineWidth:2,
        pointSize:1,
    });

    Morris.Area({
        element: 'morris-area-chart1',
        data: [{ period: '2020-10',facturas: 2, notascredito: null, notasdebito: null },
        { period: '2020-11', facturas: 5, notascredito: 1, notasdebito: null },
            { period: '2020-12', facturas: 4, notascredito: null, notasdebito: null },
            { period: '2021-01', facturas: 26, notascredito: 2, notasdebito: null },
            { period: '2021-02', facturas: 4, notascredito: 1, notasdebito: 1 },
            { period: '2021-02', facturas: 1, notascredito: 1, notasdebito: null }],
        xkey: 'period',
        ykeys: ['facturas', 'notascredito', 'notasdebito'],
        labels: ['Facturas', 'Notas Credito', 'Notas Debito'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true,
        lineColors: ['#ffcc00', '#15284c','#000000'],
        lineWidth:2,
        pointSize:1,
    });

    Morris.Area({
        element: 'morris-area-chart2',
        data: [{ period: '2020-10', facturas: 1, notascredito: 1, notasdebito: null},
                { period: '2020-11', facturas: 3, notascredito: 2, notasdebito: null },
                { period: '2020-12', facturas: null, notascredito: null, notasdebito: null },
                { period: '2021-01', facturas: 7, notascredito: 3, notasdebito: null },
                { period: '2021-02', facturas: null, notascredito: 1, notasdebito: null },
                { period: '2021-03', facturas: null, notascredito: null, notasdebito: null }],
        xkey: 'period',
        ykeys: ['facturas', 'notascredito', 'notasdebito'],
        labels: ['Facturas', 'Notas Credito', 'Notas Debito'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true,
        lineColors: ['#ffcc00', '#15284c','#000000'],
        lineWidth:2,
        pointSize:1,
    });

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{ label: "CompanyTest 1 ", value: 57 },
            { label: "CompanyTest 2", value: 4 },
            { label: "CompanyTest 3", value: 2 } ],
        resize: true,
        colors: ['#ffcc00','#15284c','#000000'],
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{ y: 'CompanyTest 1', a: 100, b: 57 },
            { y: 'CompanyTest 2', a: 100, b: 4 },
            { y: 'CompanyTest 3', a: 100, b: 0 } ],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Transacciones Total', 'Transacciones'],
        hideHover: 'auto',
        resize: true,
        barColors: ['#15284c', '#ffcc00'],
    });

    Morris.Line({
        element: 'morris-line-chart',
        data: [{ y: '2006', a: 100, b: 90 },
            { y: '2007', a: 75, b: 65 },
            { y: '2008', a: 50, b: 40 },
            { y: '2009', a: 75, b: 65 },
            { y: '2010', a: 50, b: 40 },
            { y: '2011', a: 75, b: 65 },
            { y: '2012', a: 100, b: 90 } ],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: true,
        lineColors: ['#54cdb4','#1ab394'],
    });

    Morris.Line({
        element: 'morris-one-line-chart',
            data: [
                { year: '2008', value: 5 },
                { year: '2009', value: 10 },
                { year: '2010', value: 8 },
                { year: '2011', value: 22 },
                { year: '2012', value: 8 },
                { year: '2014', value: 10 },
                { year: '2015', value: 5 }
            ],
        xkey: 'year',
        ykeys: ['value'],
        resize: true,
        lineWidth:4,
        labels: ['Value'],
        lineColors: ['#1ab394'],
        pointSize:5,
    });

});

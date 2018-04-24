function visualizeSolution(matrix) {
    let islandsCount = 0;
    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    function selectCell(i, j) {
        let cell = document.getElementById(`${i}${j}`);
        if (cell !== null) {
            cell.style.border = '3px solid yellow';
            sleep(1000).then(() => {
                let cell = document.getElementById(`${i}${j}`);
            cell.style.border = '1px solid black';
            cell.style.backgroundColor = 'orange';
        });
        }
    }

    function printMatrix(matrix) {
        let table = document.createElement('table');
        let tableBody = document.createElement('tbody');
        matrix.forEach(function (rowData, i) {
            let row = document.createElement('tr');
            rowData.forEach(function (cellData, j) {
                let cell = document.createElement('td');
                cell.id = `${i}${j}`;
                if (cellData === 1) {
                    cell.style.backgroundColor = 'green';
                }
                if (cellData === 0) {
                    cell.style.backgroundColor = 'blue'
                }
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        document.body.appendChild(table);
    }
    printMatrix(matrix);

    function visualizeSelect() {

        let i = 0;
        let j = -1;
        function logCheckNeighbours(i, j) {
            document.getElementById('log').innerHTML += `Checking neighbours at ${i}-${j}<br>`;
        }

        function checkNeighbors(i, j, matrix) {
            let hasNeighbours = false;
            if (matrix[i + 1] !== undefined) {
                if (matrix[i + 1][j] !== 0) {
                    selectCell(i + 1, j);
                    logCheckNeighbours(i + 1, j);
                    matrix[i + 1][j] = 0;
                    checkNeighbors(i + 1, j, matrix);
                    hasNeighbours = true;
                }
            }
            if (matrix[i][j + 1] !== undefined) {
                if (matrix[i][j + 1] !== 0) {
                    selectCell(i, j + 1);
                    logCheckNeighbours(i, j + 1);
                    matrix[i][j + 1] = 0;
                    checkNeighbors(i, j + 1, matrix);
                    hasNeighbours = true;
                }
            }
            if (matrix[i - 1] !== undefined) {
                if (matrix[i - 1][j] !== 0) {
                    selectCell(i - 1, j);
                    logCheckNeighbours(i - 1, j);
                    matrix[i - 1][j] = 0;
                    checkNeighbors(i - 1, j, matrix);
                    hasNeighbours = true;
                }
            }
            if (matrix[i][j - 1] !== undefined) {
                if (matrix[i][j - 1] !== 0) {
                    selectCell(i, j - 1);
                    logCheckNeighbours(i, j - 1);
                    matrix[i][j - 1] = 0;
                    checkNeighbors(i, j - 1, matrix);
                    hasNeighbours = true;
                }
            }
            if (!hasNeighbours) {
                islandsCount++;
                document.getElementById('log').innerHTML += `<p style="color:red;">Island Number ${islandsCount} is found</p>`;
            }
        }

        return function checkCells() {
            if (i < matrix.length) {
                if (++j < matrix[i].length) {
                    if (matrix[i][j] === 1) {
                        document.getElementById('log').innerHTML += `Checking Element at ${i}-${j}<br>`;
                        selectCell(i, j);
                        matrix[i][j] = 0;
                        checkNeighbors(i, j, matrix);
                    }
                    if (j === matrix[0].length - 1) {
                        i++;
                        j = -1;
                    }
                    setTimeout(checkCells, 500);
                }
            }
        }();
    }
    visualizeSelect();
}
visualizeSolution(mapOfIslands);
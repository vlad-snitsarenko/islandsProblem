const mapOfIslands = [
    [1, 1, 0, 1, 0],
    [0, 1, 0, 0, 1],
    [1, 0, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0]
];

function solution(data) {
    let matrix = JSON.parse(JSON.stringify(data));

    function isIslands(matrix, x, y) {
        if (typeof matrix[x] !== 'undefined') {
            if (matrix[x][y] === 1) {
                matrix[x][y] = 0;
                isIslands(matrix, x + 1, y);
                isIslands(matrix, x, y + 1);
                isIslands(matrix, x - 1, y);
                isIslands(matrix, x, y - 1);
            }
        }

    }

    let islandsCount = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                islandsCount++;
                isIslands(matrix, i, j);
            }
        }
    }
    return islandsCount;
}

console.log(solution(mapOfIslands));
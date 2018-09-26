module.exports = function solveSudoku(matrix) {

    function used_in_row(row, num) {
        for (let col = 0; col < 9; col++) {
            if(matrix[row][col] === num) {
                return true;
            }
        }
        return false;
    }
    
    function used_in_col(col, num) {
        for (let row = 0; row < 9; row++) {
            if (matrix[row][col] === num) {
                return true;
            }
        }
        return false;
    }

    function used_in_box(box_start_row, box_start_col, num) {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (matrix[row + box_start_row][col + box_start_col] === num) {
                    return true;
                }
            }
        }
        return false
    }
    
    function is_safe(row, col, num) {
        return !used_in_row(row, num) && !used_in_col(col, num) && !used_in_box(row - row % 3, col - col % 3, num)
    }
    
    function get_unassigned_location() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (matrix[row][col] === 0) {
                    return [row, col]
                }
            }
        }
        return [8,8];
    }

    function solve_sudoku() {
        if (JSON.stringify([8, 8]) === (JSON.stringify(get_unassigned_location())))  {
            return true;
        }

        let arr = get_unassigned_location();
        let row = arr[0];
        let col = arr[1];

        for (let num=1; num <= 9; num++) {
            if (is_safe(row, col, num)) {
                matrix[row][col] = num;
                if (solve_sudoku()) {
                    return true;
                }
                matrix[row][col] = 0;
            }
        }
        return false;
    }

    if (solve_sudoku() === true) {
        return matrix;
    }

    
}

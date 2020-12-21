def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """

    sum_diag = 0

    for i in range(len(matrix)):
        # if [1,2,3,4,5],first loop add 1 and 5. then second loop [6,7,8,9,10] add 7 and 9. Third loop[11,12,13,14,15] add 13 twice.
        sum_diag += matrix[i][i]
        sum_diag += matrix[i][-1 - i]

    return sum_diag
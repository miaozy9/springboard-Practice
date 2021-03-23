def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """

    counts = []
    distinct_nums = set(nums)
    # print(distinct_nums)
    max = -1

    for num in distinct_nums:
        if nums.count(num) > max:
            # print("yes")
            max = nums.count(num)
            counts.append(num)
    # print(counts)
    return counts[-1]
    
    # Slightly different from solution. Both O(n).
    
# mode([1,2,2,3,2,1,5,6,6,6,6,1,3])
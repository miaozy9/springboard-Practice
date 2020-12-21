def find_the_duplicate(nums):
    """Find duplicate number in nums.

    Given a list of nums with, at most, one duplicate, return the duplicate.
    If there is no duplicate, return None

        >>> find_the_duplicate([1, 2, 1, 4, 3, 12])
        1

        >>> find_the_duplicate([6, 1, 9, 5, 3, 4, 9])
        9

        >>> find_the_duplicate([2, 1, 3, 4]) is None
        True
    """

    num_dic = get_freq_dic(nums)
    # print(num_dic)
    for item in num_dic:
        if num_dic.get(item) > 1:
            return item


def get_freq_dic(s):
    counts = {}
    for x in s:
        counts[x] = counts.get(x, 0) + 1
    return counts

# print(find_the_duplicate([6, 1, 9, 5, 3, 4, 9]))
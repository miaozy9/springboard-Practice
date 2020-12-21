def multiply_even_numbers(nums):
    """Multiply the even numbers.
    
        >>> multiply_even_numbers([2, 3, 4, 5, 6])
        48
        
        >>> multiply_even_numbers([3, 4, 5])
        4
        
    If there are no even numbers, return 1.
    
        >>> multiply_even_numbers([1, 3, 5])
        1
    """
    #even_list will be an empty list if there are no even numbers
    even_filtered = [num for num in nums if num % 2 == 0]

    result = 1
    for x in even_filtered:
         result = result * x 
        #  print("aha")
    return result 

    #can imported numpy to multiply all items in the even list.

# print(multiply_even_numbers([1,2,3,5,7]))

# print(multiply_even_numbers([1,9,3,5,7]))
def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """
    dic_of_frequency = {}
    char_set  = set(phrase)
    for char in char_set:
        dic_of_frequency[char] = phrase.count(char)
    return dic_of_frequency

    # counter = {}

    # for ltr in phrase:
    #     counter[ltr] = counter.get(ltr, 0) + 1

    # return counter
    # Solution:
    # iterate all letters in phrase. if the letter is not found in dictionary
    # set the value of that letter key to 0 by counter.get(ltr, 0). if the letter is found, then increase the value by 1

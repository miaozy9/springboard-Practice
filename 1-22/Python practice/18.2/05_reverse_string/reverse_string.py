def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """

    return phrase[::-1]
    # use slice default start and end. the step is -1 means slice backwards from the end

# print(type(reverse_string("abcdefg")))
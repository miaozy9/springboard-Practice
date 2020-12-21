def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """

    pharse_lower_trimmed = phrase.lower().replace(" ", "")
    #reverse the phrase
    reverse_phrase = pharse_lower_trimmed[::-1]
    return reverse_phrase == pharse_lower_trimmed

def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
    # built-in method won't work if the fist character is a space.
    # return phrase.capitalize()

    # find first index need to import re as I searched
    # seems more complicated so I use my version.
    if phrase == "":
        return ""
    i = 0
    for char in phrase:
        if char.isalpha():
            break
        i += 1
    if i == len(phrase):
        return phrase
    # print(i)
    # print(phrase[:i])
    # print(phrase[i].upper())
    # print(phrase[i:])
    return phrase[:i] + phrase[i].upper() + phrase[i+1:]

# print(capitalize("121   aaa"))
# print(capitalize("121   "))
# print(capitalize("A12321aaa"))
# print(capitalize(""))

#Now it works even there are spaces or numbers in front of the phrase or there are only non letters in the list :)
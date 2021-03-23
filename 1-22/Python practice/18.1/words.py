def print_upper_words(words, letter_list):
    for word in words:
        for letter in letter_list:
            if word.startswith(letter):
                print(word.upper())
                break


print_upper_words(["eagle", "Edward", "Alfred", "zope"], letter_list=["A", "E", "E", "E"])
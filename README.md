# Dictionary Server

## Url Link

- ![website](http://dictionary-front-bucket-cicd.s3-website.eu-west-3.amazonaws.com/)

## Preview

![phone](https://user-images.githubusercontent.com/89574309/151831039-60080baf-e9a1-4994-92d7-3baeef6d5852.jpg)

## Endpoints

- /part-of-speech/:part?letter=a

**letter is optional**

Return
```javascript
{
    "word": {
        "definitions": [
            "A name given to various roots, tubers, or pods grown under or on the ground; as to:",
            "The esculent tubers of the umbelliferous plants Bunium flexuosum and Carum Bulbocastanum.",
            "The peanut. See Peanut."
        ],
        "pos": "n.",
        "word": "EARTHNUT"
    }
}
```

- - - -

- /:word

Return
```javascript
{
    "words": [
        {
            "definitions": [
                "An expletive, void of sense, to fill up the meter A merry heart goes all the day, Your sad tires in a mile-a. Shak."
            ],
            "pos": "n.",
            "word": "A"
        },
        {
            "definitions": [
                "In; on; at; by. [Obs.] \"A God's name.\" \"Torn a pieces.\" \"Stand a tiptoe.\" \"A Sundays\" Shak. \"Wit that men have now a days.\" Chaucer. \"Set them a work.\" Robynson (More's Utopia)",
                "In process of; in the act of; into; to; -- used with verbal substantives in -ing which begin with a consonant. This is a shortened form of the preposition an (which was used before the vowel sound); as in a hunting, a building, a begging. \"Jacob, when he was a dying\" Heb. xi. 21. \"We'll a birding together.\" \" It was a doing.\" Shak. \"He burst out a laughing.\" Macaulay. The hyphen may be used to connect a with the verbal substantive (as, a-hunting, a-building) or the words may be written separately. This form of expression is now for the most part obsolete, the a being omitted and the verbal substantive treated as a participle."
            ],
            "pos": "prep.",
            "word": "A"
        }
    ]
}
```

- - - -

- /:word/:partOfSpeech

Return
```javascript
{
    "words": [
        {
            "definitions": [
                "An expletive, void of sense, to fill up the meter A merry heart goes all the day, Your sad tires in a mile-a. Shak."
            ],
            "pos": "n.",
            "word": "A"
        }
    ]
}
```


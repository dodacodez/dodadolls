## Data structure checks

write a small node script that takes src/dollmatch/data.json and check that the amount of items with is_mtm=true equals to the amount of items that have body_type="MTM"|"Made to Move"

## Data structure

data structure new shape and normalization:

write a node script that takes src/dollmatch/data.json - an array of data like this:

```
  {
    "id": 33,
    "name": "You Create Barbie Basics Kit #3 Rose Curvy",
    "model_number": "JBH87",
    "year_released": "2025",
    "body_type": "MTM",
    "is_mtm": true,
    "image_url": "https://en.barbiepedia.com/img/barbie/360/JBH87_0.jpg",
    "image_filename": null,
    "skin_tone": "Basics 03",
    "skin_tone_hex": "#512117",
    "skin_tone_description": "Dark",
    "doll_line": "You Create Barbie Basics Kit",
    "face_sculpt_name": "Rose",
    "mtm_edition": "Curvy"
  }
```

and turns it into an array of items like this:

```
{
  id: number, // index in the array rather than the original id
  mattel_id: string, // this is model_number
  name: string,
  year: string,
  image_url: string,
  body_type:string , // when the item.is_mtm=true and item.mtm_edition is set and item.body_type is "MTM" or "Made to Move" set the value of this field to item.mtm_edition's value .. make them all lowercase
  is_mtm: boolean,
  mtm_variant: string, // if mtm_edition is not null the fill it out with "classic"
  skintone: {
    name: string, // skin_tone
    color: string // hex i.e. skin_tone_hex,
    description: string
  },
  facesculpt: string,
  line: string, // doll_line
}
```

when original item values are null omit them from the item. exception: always include the `skintone` object (with its `name`, `color` and `description` properties), `facesculpt`, `line` and `image_url`, setting them to null when the source value is missing.

## Matching logic

match:

- mtm: where true and false match
  - mtm=true has body_type, when matching a mtm=false with mtm=true additionally offer to filter by body type
- skin tone: sorted by similarity
  - match by skin_tone and then sort by skin_tone_hex similarity (closer or exact match = higher similarity score)

[ {
    "type":"string",
    "name": "Etat",
    "label":"L'etat",
    "placeholder": "",
    "field": "text",
    "require": true,
    "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFsYXJtLWNsb2NrLWNoZWNrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEzIiByPSI4Ii8+PHBhdGggZD0iTTUgMyAyIDYiLz48cGF0aCBkPSJtMjIgNi0zLTMiLz48cGF0aCBkPSJNNi4zOCAxOC43IDQgMjEiLz48cGF0aCBkPSJNMTcuNjQgMTguNjcgMjAgMjEiLz48cGF0aCBkPSJtOSAxMyAyIDIgNC00Ii8+PC9zdmc+",
    "match": ["^FIAT.+","i"],
    "enum": ["marche","en panne"],
    "min": 0,
    "max": 100,
    "maxSize": 20000,
    "mime":["application/json",["image/png"]]
},
{
    "type":"date",
    "name": "acquisition_date",
    "label": "Date d'acquisition",
    "field": "date",
    "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFycm93LWRvd24tMC0xIj48cGF0aCBkPSJtMyAxNiA0IDQgNC00Ii8+PHBhdGggZD0iTTcgMjBWNCIvPjxyZWN0IHg9IjE1IiB5PSI0IiB3aWR0aD0iNCIgaGVpZ2h0PSI2IiByeT0iMiIvPjxwYXRoIGQ9Ik0xNyAyMHYtNmgtMiIvPjxwYXRoIGQ9Ik0xNSAyMGg0Ii8+PC9zdmc+",
    "enum": [10,20,40],
    "min": "2000-02-09T22:56:40.000+03:00"
}
]

const rule = {
    "type":"string",
    "name": "Etat",
    "label":"L'etat",
    "placeholder": "",
    "field": "text",
    "require": true,
    "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFsYXJtLWNsb2NrLWNoZWNrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEzIiByPSI4Ii8+PHBhdGggZD0iTTUgMyAyIDYiLz48cGF0aCBkPSJtMjIgNi0zLTMiLz48cGF0aCBkPSJNNi4zOCAxOC43IDQgMjEiLz48cGF0aCBkPSJNMTcuNjQgMTguNjcgMjAgMjEiLz48cGF0aCBkPSJtOSAxMyAyIDIgNC00Ii8+PC9zdmc+",
    "match": ["^FIAT.+","i"],
    "enum": ["marche","en panne"],
    "min": 0,
    "max": 100,
    "maxSize": 20000,
    "mime":["application/json",["image/png"]]
}

from random import random, randint

# passwords
# alex aLeX
# bob bob
# slay slaying
# crunch chocolatebar
# danimals yogurt

users = ["alex", "slay", "bob", "crunch", "danimals"]
categories = {
    "alex": ["Groceries", "Shopping", "School"],
    "slay": ["School", "Shopping"],
    "bob": ["A", "B", "C"],
    "crunch": ["A"],
    "danimals": ["Yogurts", "Actors", "Personnel", "Ad Budget"]
}
stores = ["Giant", "Aramark", "Drexel", "Temple", "Barnes & Nobles", "Trader Joe's", "Dunkin'", "Bleep", "Bloop Blap", "Vanilla Ice Cream", "Strawberry"]

with open("sql-test.txt", "w") as fi:
    for step in range(6400):
        user = users[randint(0, len(users) - 1)]

        merchant = stores[randint(0, len(stores) - 1)]
        price = float(f"{(randint(0, 320) + random()):.2f}")
        category = categories[user][randint(0, len(categories[user]) - 1)]

        randommonth = f"{randint(1, 12):0>2d}"
        randomday = f"{randint(1, 28):0>2d}"
        randomyear = randint(2022, 2025)
        randomdate = f"{randomyear}-{randommonth}-{randomday}"

        fi.write(f"INSERT INTO activity (act_date, merchant, price, user, category) VALUES (\"{randomdate}\", \"{merchant}\", {price}, \"{user}\", \"{category}\");\n")
from app.models import db, CustomDeck, environment, SCHEMA

def seed_custom_decks():
    metroidDeck = CustomDeck(deck_name="Metroid Deck", card_art="https://freepngimg.com/download/symbol/91742-prime-metroid-brand-trademark-returns-samus.png", user_id=2)
    marioDeck = CustomDeck(deck_name="Mario Deck", card_art="https://static.wikia.nocookie.net/mario/images/7/7a/1208px-Mushroom2.png/revision/latest/scale-to-width-down/1208?cb=20190607181634", user_id=3)

    db.session.add(metroidDeck)
    db.session.add(marioDeck)
    db.session.commit()
    
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_custom_decks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.custom_decks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM custom_decks")
        
    db.session.commit()